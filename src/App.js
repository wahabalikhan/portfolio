
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AIWorkflowPage from './pages/AIWorkflowPage';
import GitDiffPage from './pages/GitDiffPage';
import SchemasPage from './pages/SchemasPage';
import DesignSystemPage from './pages/DesignSystemPage';
import DesignersCode from './pages/DesignersCode';
import BuildingPortfolioPage from './pages/BuildingPortfolioPage';
import DesignSystemsBlogPage from './pages/DesignSystemsBlogPage';
import ExperiencePage from './pages/ExperiencePage';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import PageNav from './components/PageNav';
import NavBrand from './components/NavBrand';

export default function App() {
  const [activeTab, setActiveTab] = useState('Design');
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

  // Load theme preference from localStorage
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
    <Router>
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

        <Routes>
          <Route path="/" element={<HomePage activeTab={activeTab} setActiveTab={setActiveTab} />} />
          <Route path="/ai-workflow" element={<AIWorkflowPage />} />
          <Route path="/git-diff" element={<GitDiffPage />} />
          <Route path="/schemas" element={<SchemasPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/designers-code" element={<DesignersCode />} />
          <Route path="/building-portfolio" element={<BuildingPortfolioPage />} />
          <Route path="/design-systems" element={<DesignSystemsBlogPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
      </div>
    </Router>
  );
}
