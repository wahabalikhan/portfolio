import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { smoothScrollToElement } from '../utils/smoothScroll';

export default function PageNav({ isDarkMode, pastCaseStudies }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isExperience = pathname === '/experience';
  // Work is active on case study detail pages, and on the homepage only once past the hero
  const isWorkActive = !isExperience && (pathname !== '/' || pastCaseStudies);

  const scrollToCaseStudies = () => smoothScrollToElement('case-studies');

  const handleWorkClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname === '/') {
      scrollToCaseStudies();
    } else {
      navigate('/');
      // Double rAF waits for the route to render before scrolling
      requestAnimationFrame(() => requestAnimationFrame(scrollToCaseStudies));
    }
  };
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
    `nav-link transition-colors ${active ? 'nav-link-active' : 'text-gray-500'}`;

  return (
    <>
      {/* Desktop nav — hidden below 768px */}
      <div className="page-nav-container gap-6 nav-desktop">
        <button onClick={handleWorkClick} className={linkClass(isWorkActive)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Work</button>
        <Link to="/experience" className={linkClass(isExperience)}>Experience</Link>
        <a
          href="mailto:wahab-ali-khan@hotmail.com"
          className="nav-link text-gray-500 transition-colors hover:text-gray-900"
        >
          Contact ↗
        </a>
        <a
          href="/cv_wahab_ali_khan.pdf"
          download="CV_Wahab_Ali_Khan.pdf"
          className="nav-link text-gray-500 transition-colors hover:text-gray-900"
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
            <button
              onClick={handleWorkClick}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 400,
                fontSize: '0.9375rem',
                color: isDarkMode ? (isWorkActive ? '#ffffff' : '#9ca3af') : (isWorkActive ? '#111827' : '#6b7280'),
                textDecoration: isWorkActive ? 'underline' : 'none',
                textDecorationThickness: '1.5px',
                textUnderlineOffset: '3px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Work
            </button>
            <Link
              to="/experience"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 400,
                fontSize: '0.9375rem',
                color: isDarkMode ? (isExperience ? '#ffffff' : '#9ca3af') : (isExperience ? '#111827' : '#6b7280'),
                textDecoration: isExperience ? 'underline' : 'none',
                textDecorationThickness: '1.5px',
                textUnderlineOffset: '3px',
                backgroundColor: 'transparent',
              }}
            >
              Experience
            </Link>
            <a
              href="mailto:wahab-ali-khan@hotmail.com"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 400,
                fontSize: '0.875rem',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
                textDecoration: 'none',
              }}
            >
              Contact
            </a>
            <a
              href="/cv_wahab_ali_khan.pdf"
              download="CV_Wahab_Ali_Khan.pdf"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 400,
                fontSize: '0.875rem',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
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
