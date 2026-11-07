-- One-off comment clean-up (November 2026). Run in Supabase → SQL Editor AFTER
-- comment-moderation.sql, and only once Wahab has approved this list.
--
-- Deletes 11 comments:
--   Home        "This is a test for the carousel" (Wahab) and its 5 replies
--   Home        "nice teeth, do you have veneers" (alrightttt) and Wahab's reply
--   Home        Wahab's reply to Shaun W ("Appreciate it, thank you! And I really enjoyed the interview")
--   Experience  both "Don't hate the avatar…" comments (Wahab)
-- And moves one comment to the tab it was about:
--   Home        "Austria solo work trips live here haha" → Just for fun
-- Every other comment stays as it is. Comments from before tabs were stored show on Design.

begin;

delete from public.comment_likes
where comment_id in (
  '39d29660-f968-45af-8924-1bb0c09ce175',
  '11b98e71-5e67-43d8-a2eb-1d3d24bbf45b',
  'bea02894-1614-42be-b773-7c2d5ac8759c',
  'ee6f31ea-6137-4e2c-a4e0-8d5daf949bc6',
  '4206040c-1f7f-4698-98c6-f4d496cdbed6',
  '9a49df90-4092-49c6-8777-0c58deac2d45',
  '0e354e3f-0fa7-4388-ba97-a3ef3a97e903',
  '837cd3e2-b4af-4c17-bd98-b0240f5f646f',
  '087e3e5f-10a4-4236-b7ae-bb3c9d8e3c2d',
  'dedec306-ec72-4e27-ab03-03882b9bc4a7',
  'f985a808-9aa6-4a69-80c5-337a30159843'
);

delete from public.comments
where id in (
  '39d29660-f968-45af-8924-1bb0c09ce175',  -- "This is a test for the carousel"
  '11b98e71-5e67-43d8-a2eb-1d3d24bbf45b',  --   reply "a reply to the test"
  'bea02894-1614-42be-b773-7c2d5ac8759c',  --   reply "a reply to the reply to the test"
  'ee6f31ea-6137-4e2c-a4e0-8d5daf949bc6',  --   reply "a reply to the reply to the reply to the test"
  '4206040c-1f7f-4698-98c6-f4d496cdbed6',  --   reply "a reply to the reply to the reply to the reply to the test"
  '9a49df90-4092-49c6-8777-0c58deac2d45',  --   reply "a reply to a reply to the reply to the reply to the reply to the test"
  '0e354e3f-0fa7-4388-ba97-a3ef3a97e903',  -- "nice teeth, do you have veneers"
  '837cd3e2-b4af-4c17-bd98-b0240f5f646f',  --   reply "haha, they're 100% real enamel…"
  '087e3e5f-10a4-4236-b7ae-bb3c9d8e3c2d',  -- reply to Shaun W "Appreciate it, thank you! And I really enjoyed the interview"
  'dedec306-ec72-4e27-ab03-03882b9bc4a7',  -- Experience "Don't hate the avatar, that's all I could find of this cool dude"
  'f985a808-9aa6-4a69-80c5-337a30159843'   -- Experience "Don't hate the avatar, only one I could find of this cool dude"
);

update public.comments
set tab = 'JustForFun'
where id = '27fc66ab-b1ca-4fb8-9a48-134f6c6e5dfb';  -- "Austria solo work trips live here haha"

commit;
