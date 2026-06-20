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
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
