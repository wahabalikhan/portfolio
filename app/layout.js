import './globals.css';
import AppShell from '@/components/AppShell';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';

const HOME_TITLE = `${SITE_NAME} · Product Designer`;
const HOME_SUMMARY = 'a product designer with 4+ years designing enterprise B2B SaaS for technical users, and using AI to help ship it. Case studies from Matillion and Adverity.';

// The meta description keeps "Wahab Ali Khan" so searches for the full name still find the site.
// Every other page sets its own description (see lib/metadata.js).
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s · ${SITE_NAME}` },
  description: `Portfolio of Wahab Ali Khan, ${HOME_SUMMARY}`,
  alternates: { canonical: '/' },
  icons: { icon: '/images/profile.png' },
  openGraph: {
    title: HOME_TITLE,
    description: `${SITE_NAME}, ${HOME_SUMMARY}`,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: `${SITE_NAME}, ${HOME_SUMMARY}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Bobby Builds: my own cookie-free analytics. Sends nothing with Global Privacy Control or Do Not Track on. */}
        <script
          defer
          src="https://bobbybuilds.app/t.js"
          data-key="pk_ofc9Edalhytt9Qvmshz3Wan3"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
