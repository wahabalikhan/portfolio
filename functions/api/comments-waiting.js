// POST /api/comments-waiting
//
// Sends BobbyBuilds HQ the number of comments waiting for approval, as the product
// number "comments_waiting" (admin-only in HQ: its public switch stays off). The site
// nudges this after a visitor posts or edits, and after the owner approves or deletes.
// Like RealTechJobs' review_waiting, it goes to HQ's /v1/metrics with the project's secret
// key, so it has to run here, never in the browser.
//
// Needs, in the Pages project's settings (Production):
//   HQ_URL   https://bobbybuilds.app
//   HQ_KEY   the portfolio project's secret key (sk_…)   [secret]
// and reuses NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (already set for
// the build). The count comes from the comments_waiting() database function
// (supabase/comment-moderation.sql), which returns a number and nothing else.
//
// Never throws; HQ being slow or down can't affect commenting. The reply doesn't include
// the number.

const TIMEOUT_MS = 2000;

function reply(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

async function countWaiting(env) {
  const base = String(env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error('Supabase URL or anon key not set');
  const res = await fetch(`${base}/rest/v1/rpc/comments_waiting`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: '{}',
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  const value = await res.json();
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Unexpected count');
  return value;
}

export async function onRequestPost({ env }) {
  if (!env.HQ_URL || !env.HQ_KEY) return reply({ sent: false, reason: 'HQ not configured' }, 503);
  try {
    const value = await countWaiting(env);
    const res = await fetch(`${new URL(env.HQ_URL).origin}/v1/metrics`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.HQ_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ metrics: [{ key: 'comments_waiting', value }] }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return reply({ sent: true });
    // HQ says why (e.g. the number hasn't been added in its settings yet).
    const body = await res.json().catch(() => null);
    return reply({ sent: false, reason: `HQ ${res.status}${body?.error ? `: ${String(body.error).slice(0, 200)}` : ''}` }, 502);
  } catch (error) {
    return reply({ sent: false, reason: String(error?.message || error).slice(0, 200) }, 502);
  }
}
