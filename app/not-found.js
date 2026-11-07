import Link from 'next/link';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';
import { SITE_NAME } from '@/lib/metadata';

// Any unknown URL. The static export writes this out as 404.html, which Cloudflare Pages
// serves with a 404 status. data-bobby-not-found lets Bobby Builds count missed pages.
export const metadata = {
  title: 'Page not found',
  description: `This page doesn’t exist. Head back to ${SITE_NAME}’s portfolio for case studies, writing and experience.`,
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16" role="main" data-bobby-not-found>
      <BackButton />
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Page not found</h1>
      <p className="text-gray-700 leading-relaxed mb-10">
        There’s nothing at this address. It may have moved, or the link may be mistyped.{' '}
        <Link href="/" className="link-text text-blue-600">Go to the home page</Link> to see the case studies and writing.
      </p>
      <Footer />
    </div>
  );
}
