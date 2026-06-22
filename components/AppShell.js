'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import PageNav from '@/components/PageNav';
import NavBrand from '@/components/NavBrand';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function AppShell({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastCaseStudies, setPastCaseStudies] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const el = document.getElementById('case-studies');
      setPastCaseStudies(el ? el.getBoundingClientRect().top <= 100 : false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
  };

  return (
    <div
      className="transition-colors app-root"
      style={{
        backgroundColor: isDarkMode ? '#050f1b' : '#F8FAFD',
        color: isDarkMode ? '#f0f0f0' : '#111827',
      }}
    >
      <ScrollToTop />
      <div
        className="top-nav-bar"
        style={{
          backgroundColor: scrolled ? (isDarkMode ? '#050f1b' : '#F8FAFD') : 'transparent',
          borderColor: scrolled ? (isDarkMode ? '#374151' : '#e5e7eb') : 'transparent',
        }}
      >
        <NavBrand pastCaseStudies={pastCaseStudies} />
        <div className="flex items-center nav-right">
          <PageNav isDarkMode={isDarkMode} pastCaseStudies={pastCaseStudies} />
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
      {children}
      <ScrollToTopButton />
    </div>
  );
}
