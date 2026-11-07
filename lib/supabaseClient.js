import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Every request carries this browser's comment token (x-comment-token), read fresh each
// time because it's created on the first comment or like. The database keeps only a hash
// of it and uses it to let a visitor edit, move or delete their own comments
// (supabase/comment-moderation.sql). Nothing is sent before the token exists.
const fetchWithCommentToken = (input, init = {}) => {
  let token = null;
  try { token = localStorage.getItem('wahab_session_token'); } catch {}
  if (!token) return fetch(input, init);
  const headers = new Headers(init.headers || (input instanceof Request ? input.headers : undefined));
  headers.set('x-comment-token', token);
  return fetch(input, { ...init, headers });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: fetchWithCommentToken },
});
