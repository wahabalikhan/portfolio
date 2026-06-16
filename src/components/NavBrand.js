import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { smoothScrollToTop } from '../utils/smoothScroll';

export default function NavBrand({ pastCaseStudies }) {
  const { pathname } = useLocation();
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
        to="/"
        onClick={handleClick}
        className={`nav-link ${isActive ? 'nav-link-active' : 'text-gray-500'}`}
        style={{ textDecoration: 'none', fontWeight: 500 }}
      >
        Hey, I'm Wahab 👋
      </Link>
    </div>
  );
}
