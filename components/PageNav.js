'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { OVERLAY_BG_STYLE, OverlayIcons } from './OverlayBackground';

export default function PageNav({ isDarkMode, pastCaseStudies }) {
  const pathname = usePathname();
  const router = useRouter();
  const isExperience = pathname === '/experience' || pathname === '/experience/';
  const isWorkActive = !isExperience && (pathname !== '/' || pastCaseStudies);

  const scrollToCaseStudies = () => smoothScrollToElement('case-studies');

  const handleWorkClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname === '/') {
      scrollToCaseStudies();
    } else {
      router.push('/');
      requestAnimationFrame(() => requestAnimationFrame(scrollToCaseStudies));
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    // double-rAF so the element mounts at opacity:0 before we flip to 1
    requestAnimationFrame(() => requestAnimationFrame(() => setOverlayVisible(true)));
  };
  const closeMenu = () => {
    setOverlayVisible(false);
    setTimeout(() => setMenuOpen(false), 380);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkClass = (active) =>
    `nav-link transition-colors ${active ? 'nav-link-active' : 'text-gray-500'}`;

  return (
    <>
      <div className="page-nav-container gap-6 nav-desktop">
        <button onClick={handleWorkClick} className={linkClass(isWorkActive)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Work</button>
        <Link href="/experience" className={linkClass(isExperience)}>Experience</Link>
        <a
          href="mailto:wahab-ali-khan@hotmail.com"
          className="nav-link text-gray-500 transition-colors"
        >
          Contact ↗
        </a>
        <a
          href="/cv_wahab_ali_khan.pdf"
          download="CV_Wahab_Ali_Khan.pdf"
          className="nav-link text-gray-500 transition-colors"
        >
          Resume ↓
        </a>
      </div>

      <div className="nav-mobile">
        <button
          aria-label="Open menu"
          onClick={openMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            cursor: 'pointer',
            padding: 0,
            border: 'none',
          }}
        >
          <Menu size={22} />
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              ...OVERLAY_BG_STYLE,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              opacity: overlayVisible ? 1 : 0,
              transition: 'opacity 0.38s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <OverlayIcons visible={overlayVisible} />

            {/* X sits exactly where the hamburger is: nav-bar padding-right + vertically centred in 4rem bar */}
            <button
              aria-label="Close menu"
              onClick={closeMenu}
              style={{
                position: 'absolute',
                top: 'calc(2rem - 11px)',
                right: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                color: '#374151',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <X size={22} />
            </button>

            {/* Menu items — evenly spaced, active in blue matching desktop nav */}
            <nav
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '3.5rem',
                padding: '0 2.5rem',
              }}
            >
              <button
                onClick={() => {
                  closeMenu();
                  setTimeout(() => {
                    if (pathname === '/') { scrollToCaseStudies(); }
                    else { router.push('/'); requestAnimationFrame(() => requestAnimationFrame(scrollToCaseStudies)); }
                  }, 400);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '2.75rem',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: isWorkActive ? '#2563eb' : '#111827',
                  textDecoration: isWorkActive ? 'underline' : 'none',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '5px',
                }}
              >
                Work
              </button>
              <Link
                href="/experience"
                onClick={closeMenu}
                style={{
                  padding: 0,
                  fontSize: '2.75rem',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: isExperience ? '#2563eb' : '#111827',
                  textDecoration: isExperience ? 'underline' : 'none',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '5px',
                }}
              >
                Experience
              </Link>
              <a
                href="mailto:wahab-ali-khan@hotmail.com"
                onClick={closeMenu}
                style={{
                  padding: 0,
                  fontSize: '2.75rem',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: '#111827',
                  textDecoration: 'none',
                }}
              >
                Contact ↗
              </a>
              <a
                href="/cv_wahab_ali_khan.pdf"
                download="CV_Wahab_Ali_Khan.pdf"
                onClick={closeMenu}
                style={{
                  padding: 0,
                  fontSize: '2.75rem',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: '#111827',
                  textDecoration: 'none',
                }}
              >
                Resume ↓
              </a>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
