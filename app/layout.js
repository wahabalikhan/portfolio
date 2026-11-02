import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'Wahab Ali Khan',
  icons: { icon: '/images/profile.png' },
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
          src="https://bobbybuilds.wahab-ali-khan.workers.dev/t.js"
          data-key="pk_ofc9Edalhytt9Qvmshz3Wan3"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
