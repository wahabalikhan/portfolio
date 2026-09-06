const CACHE_KEY = new Request('https://internal-cache.local/github-contributions-v2');
const CACHE_TTL = 21600; // 6 hours

const QUERY = `{
  user(login: "wahabalikhan") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...extraHeaders,
    },
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  // Return cached response if fresh
  const cached = await caches.default.match(CACHE_KEY);
  if (cached) return cached;

  if (!env.GITHUB_TOKEN) {
    return jsonResponse({ error: 'GitHub token not configured' }, 503);
  }

  let githubData;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'wahabalikhan-portfolio',
      },
      body: JSON.stringify({ query: QUERY }),
    });

    if (!res.ok) {
      let body = '';
      try { body = await res.text(); } catch {}
      return jsonResponse({ error: `GitHub API responded with ${res.status}`, detail: body.slice(0, 500) }, 502);
    }

    githubData = await res.json();
  } catch (err) {
    return jsonResponse({ error: 'Failed to reach GitHub API', detail: String(err) }, 502);
  }

  if (githubData.errors) {
    return jsonResponse({ error: 'GitHub GraphQL error', detail: JSON.stringify(githubData.errors) }, 502);
  }

  const calendar = githubData?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    return jsonResponse({ error: 'Unexpected GitHub API response shape' }, 502);
  }

  const shaped = {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map(w =>
      w.contributionDays.map(d => ({ date: d.date, count: d.contributionCount }))
    ),
  };

  const response = jsonResponse(shaped, 200, {
    'Cache-Control': `public, max-age=${CACHE_TTL}`,
  });

  context.waitUntil(caches.default.put(CACHE_KEY, response.clone()));

  return response;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET' },
  });
}
