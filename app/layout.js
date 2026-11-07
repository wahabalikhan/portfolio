import './globals.css';
import AppShell from '@/components/AppShell';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';

const HOME_TITLE = `${SITE_NAME} · Product Designer`;
// The home page's search and link-preview description (under 160 characters, so results
// don't cut it off). Every other page sets its own (see lib/metadata.js).
const HOME_DESCRIPTION = 'Product designer with 4+ years designing B2B data tools. Case studies from Matillion and Adverity: research, design systems and workflow design.';
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s · ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  icons: { icon: '/images/profile.png' },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
