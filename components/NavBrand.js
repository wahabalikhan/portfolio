'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { smoothScrollToTop } from '@/utils/smoothScroll';

export default function NavBrand({ pastCaseStudies }) {
  const pathname = usePathname();
  const isActive = pathname === '/' && !pastCaseStudies;

  const handleClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      smoothScrollToTop();
    }
  };

  return (
    <div className="nav-brand-container">
      <Link
        href="/"
        onClick={handleClick}
        className={`nav-link ${isActive ? 'nav-link-active' : 'text-gray-500'}`}
        style={{ textDecoration: 'none', fontWeight: 500 }}
      >
        Hey, I'm Wahab 👋
      </Link>
    </div>
  );
}
