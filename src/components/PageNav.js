import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PageNav() {
  const { pathname } = useLocation();
  const isExperience = pathname === '/experience';

  return (
    <div className="page-nav-container gap-6">
      <Link
        to="/"
        className={`link-text transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
          !isExperience ? 'font-bold text-gray-900' : 'font-medium text-gray-700'
        }`}
      >
        Case studies
      </Link>
      <Link
        to="/experience"
        className={`link-text transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
          isExperience ? 'font-bold text-gray-900' : 'font-medium text-gray-700'
        }`}
      >
        Experience
      </Link>
      <a
        href="/resume.pdf"
        download="Wahab_Ali_Khan_Resume.pdf"
        className="link-text font-medium text-gray-700 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        Resume
      </a>
    </div>
  );
}
