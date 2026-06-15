import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBrand() {
  return (
    <div className="nav-brand-container">
      <Link
        to="/"
        className="link-text text-md font-medium text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Hey, I'm Wahab 👋
      </Link>
    </div>
  );
}
