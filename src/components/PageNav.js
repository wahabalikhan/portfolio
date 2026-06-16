import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function PageNav({ isDarkMode }) {
  const { pathname } = useLocation();
  const isExperience = pathname === '/experience';
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close on outside click
  useEffect(() => {
    const onOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [menuOpen]);

  const linkClass = (active) =>
    `link-text transition-colors hover:text-blue-600 ${active ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`;

  return (
    <>
      {/* Desktop nav — hidden below 768px */}
      <div className="page-nav-container gap-6 nav-desktop">
        <Link to="/" className={linkClass(!isExperience)}>Case studies</Link>
        <Link to="/experience" className={linkClass(isExperience)}>Experience</Link>
        <a
          href="/resume.pdf"
          download="Wahab_Ali_Khan_Resume.pdf"
          className="link-text font-medium text-gray-700 transition-colors hover:text-blue-600"
        >
          Resume ↓
        </a>
      </div>

      {/* Hamburger button — shown below 768px */}
      <div className="nav-mobile" ref={dropdownRef}>
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '9999px',
            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
            backgroundColor: 'transparent',
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            cursor: 'pointer',
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '5.5rem',
              right: '2.5rem',
              minWidth: '160px',
              backgroundColor: isDarkMode ? '#1c1c1c' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '0.75rem',
              padding: '0.375rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.125rem',
            }}
          >
            {[
              { to: '/', label: 'Case studies', active: !isExperience },
              { to: '/experience', label: 'Experience', active: isExperience },
            ].map(({ to, label, active }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.9375rem',
                  color: isDarkMode ? (active ? '#ffffff' : '#d1d5db') : (active ? '#111827' : '#374151'),
                  textDecoration: 'none',
                  backgroundColor: active
                    ? (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')
                    : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download="Wahab_Ali_Khan_Resume.pdf"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                fontSize: '0.9375rem',
                color: isDarkMode ? '#d1d5db' : '#374151',
                textDecoration: 'none',
              }}
            >
              Resume ↓
            </a>
          </div>
        )}
      </div>
    </>
  );
}
