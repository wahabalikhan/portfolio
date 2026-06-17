import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>
            Made with 🫶🏼 using Figma, React, Vite, Supabase and Claude
          </p>
          <p className="text-gray-600 text-sm">
            © Wahab Ali Khan 2026
          </p>
        </div>
        <a
          href="https://www.linkedin.com/in/wahabalikhan/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-text text-blue-600 inline-flex items-center gap-1.5"
        >
          <img src="/linkedin-icon.svg" alt="LinkedIn" width="16" height="16" />
          <b>LinkedIn ↗</b>
        </a>
      </div>
    </footer>
  );
}
