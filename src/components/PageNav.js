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
    </div>
  );
}
