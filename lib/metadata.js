// Shared tab titles and share (Open Graph / Twitter) details.
// The root layout's title template appends " · Wahab (Bobby) Khan" to each page name.

export const SITE_NAME = 'Wahab (Bobby) Khan';
export const SITE_URL = 'https://wahabalikhan.com';

// Each route's layout.js calls this. Setting openGraph here replaces the root's,
// so siteName, type and twitter card are repeated for every page.
export function pageMetadata({ name, path, description }) {
  const title = `${name} · ${SITE_NAME}`;
  return {
    title: name,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}
