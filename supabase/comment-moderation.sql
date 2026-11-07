-- Comment moderation, owner-only powers and per-tab comments.
-- Run once in Supabase → SQL Editor, BEFORE deploying the code that uses it.
-- Safe to run again (e.g. to change the owner).
--
-- ┌─ BEFORE RUNNING ────────────────────────────────────────────────────────────────┐
-- │ Put your own Supabase user ID on the line marked ★ below (one place only).       │
-- │ Find it in Supabase → Authentication → Users: your row's "UID" column (copy it), │
-- │ or run:  select id, email from auth.users;                                       │
-- │ The script stops with an error if it's missing or isn't a real user.             │
-- └──────────────────────────────────────────────────────────────────────────────────┘
--
-- Who can do what (public.comments):
--   Read      approved comments: everyone. Waiting (unapproved) comments: only the owner.
--   Add       anyone. A new comment or reply always starts unapproved, unless the owner
--             posts it. The author's token is set by the database, not by the browser.
--   Approve   only the owner.
--   Move      the owner (any comment), or the visitor who wrote it (their browser sends
--             its token in the x-comment-token header; the database keeps only a SHA-256
--             hash of it, so the tokens it shows can't be reused).
--   Edit      the owner (any comment); a visitor only their own, through
--             edit_my_comment(), which sends it back to the queue.
--   Delete    the owner (any comment), or the visitor who wrote it.
-- "Owner" is one account, by user ID: other signed-in accounts count as visitors.
-- The SQL editor / service role (no visitor JWT) are trusted, for admin work.
--
-- Also: comments.tab (which home-page tab a comment belongs to; empty = Design) and
-- comments_waiting(), the number waiting, for BobbyBuilds HQ (/api/comments-waiting).
-- Comment likes (public.comment_likes) are not changed.

begin;

-- ── 1. The owner (★ the only line to edit) ─────────────────────────────────────────
do $$
declare
  owner_id text := 'PASTE-YOUR-SUPABASE-USER-ID-HERE';   -- ★
begin
  if owner_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    raise exception 'Put your Supabase user ID on the line marked ★ (Authentication → Users → UID).';
  end if;
  if not exists (select 1 from auth.users where id = owner_id::uuid) then
    raise exception 'No user with ID % in auth.users. Copy the UID from Authentication → Users.', owner_id;
  end if;
  execute format($fn$
    create or replace function public.is_comments_owner()
    returns boolean
    language sql
    stable
    set search_path = public
    as $body$ select coalesce(auth.uid() = %L::uuid, false) $body$
  $fn$, owner_id);
end;
$$;

grant execute on function public.is_comments_owner() to anon, authenticated;

-- The SQL editor and the service role (admin connections, no visitor JWT).
create or replace function public.comments_admin_connection()
returns boolean
language sql
stable
as $$ select auth.role() is null or auth.role() = 'service_role' $$;

-- SHA-256 (hex) of the visitor's token from the x-comment-token request header, or null.
create or replace function public.comments_request_token_hash()
returns text
language sql
stable
as $$
  select case
    when nullif(current_setting('request.headers', true), '') is null then null
    when coalesce(current_setting('request.headers', true)::json ->> 'x-comment-token', '') = '' then null
    else encode(sha256(convert_to(current_setting('request.headers', true)::json ->> 'x-comment-token', 'UTF8')), 'hex')
  end
$$;

-- ── 2. Columns ─────────────────────────────────────────────────────────────────────
-- Drop every existing policy on comments first: Postgres won't change a column's type
-- while a policy uses it, and step 4 replaces them all anyway.
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'comments' loop
    execute format('drop policy %I on public.comments', p.policyname);
  end loop;
end;
$$;

-- session_token was a uuid column; it now holds a 64-character hash, so it becomes text.
alter table public.comments alter column session_token type text using session_token::text;

-- Existing comments are approved (they stay visible); new ones default to waiting.
alter table public.comments add column if not exists approved boolean not null default true;
alter table public.comments alter column approved set default false;
alter table public.comments add column if not exists tab text;

-- Existing raw tokens → their SHA-256 hash (raw tokens are UUIDs, hashes are 64 hex
-- characters, so running this twice changes nothing). Visitors' browsers keep the raw
-- token, so they still own their old comments.
update public.comments
set session_token = encode(sha256(convert_to(session_token, 'UTF8')), 'hex')
where session_token is not null and session_token !~ '^[0-9a-f]{64}$';

-- ── 3. What the database decides, whatever the browser sends ───────────────────────
create or replace function public.comments_moderation_guard()
returns trigger
language plpgsql
as $$
declare
  admin   boolean := public.comments_admin_connection();
  trusted boolean := admin or public.is_comments_owner();
begin
  if tg_op = 'INSERT' then
    new.approved := trusted;
    if not admin then
      new.session_token := public.comments_request_token_hash();
    end if;
  elsif not trusted then
    -- A visitor editing or moving their own comment: can't approve it, re-home it,
    -- or hand it to someone else; changing the words sends it back to the queue.
    new.session_token := old.session_token;
    new.page          := old.page;
    new.parent_id     := old.parent_id;
    new.tab           := old.tab;
    if new.body is distinct from old.body or new.author is distinct from old.author then
      new.approved := false;
    else
      new.approved := old.approved;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists comments_moderation_guard on public.comments;
create trigger comments_moderation_guard
  before insert or update on public.comments
  for each row execute function public.comments_moderation_guard();

-- ── 4. Row-level security: the complete new set of policies ───────────────────────
alter table public.comments enable row level security;

-- (The old policies were dropped in step 2.)
create policy "comments: read approved, owner reads all"
  on public.comments for select
  using (approved or public.is_comments_owner());

create policy "comments: anyone can add"
  on public.comments for insert
  with check (true);

create policy "comments: owner or author can change"
  on public.comments for update
  using (public.is_comments_owner() or (session_token is not null and session_token = public.comments_request_token_hash()))
  with check (public.is_comments_owner() or (session_token is not null and session_token = public.comments_request_token_hash()));

create policy "comments: owner or author can delete"
  on public.comments for delete
  using (public.is_comments_owner() or (session_token is not null and session_token = public.comments_request_token_hash()));

-- ── 5. A visitor editing their own words ───────────────────────────────────────────
-- An edit sends the comment back to the queue, which hides it from its author too, and
-- Postgres refuses a plain UPDATE whose result the updater couldn't see. So visitors'
-- edits go through this function: it only touches a comment whose token matches this
-- browser's (and that is currently showing), and the trigger above re-queues it.
-- Returns true if the comment was changed.
create or replace function public.edit_my_comment(comment_id uuid, new_body text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  token_hash text := public.comments_request_token_hash();
  changed integer;
begin
  if token_hash is null or coalesce(btrim(new_body), '') = '' then
    return false;
  end if;
  update public.comments
  set body = btrim(new_body)
  where id = comment_id and session_token = token_hash and approved;
  get diagnostics changed = row_count;
  return changed = 1;
end;
$$;

revoke all on function public.edit_my_comment(uuid, text) from public;
grant execute on function public.edit_my_comment(uuid, text) to anon, authenticated;

-- ── 6. How many are waiting (a number only, no comment content) ────────────────────
create or replace function public.comments_waiting()
returns integer
language sql
stable
security definer
set search_path = public
as $$ select count(*)::integer from public.comments where not approved $$;

revoke all on function public.comments_waiting() from public;
grant execute on function public.comments_waiting() to anon, authenticated;

commit;
