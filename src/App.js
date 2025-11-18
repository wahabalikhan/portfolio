
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GitDiffPage from './pages/GitDiffPage';
import SchemasPage from './pages/SchemasPage';
import DesignSystemPage from './pages/DesignSystemPage';
import DesignersCode from './pages/DesignersCode';
import BuildingPortfolioPage from './pages/BuildingPortfolioPage';
import DesignSystemsBlogPage from './pages/DesignSystemsBlogPage';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import SpotifyPlayerPill from './components/SpotifyPlayerPill';
import ResponsiveMenu from './components/ResponsiveMenu';

export default function App() {
  // For tab state on homepage only
  const [activeTab, setActiveTab] = useState('Design');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1150);
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  
  const isDesktop = windowWidth > 1150;
  
  // ScrollToTop component handles scrolling on route change
  return (
    <Router>
      <div 
        className="min-h-screen transition-colors app-root"
        style={{
          backgroundColor: isDarkMode ? '#050f1b' : '#F8FAFD',
          color: isDarkMode ? '#f0f0f0' : '#111827',
        }}
      >
        <ScrollToTop />
        {/* Desktop Layout - Only render above 1150px */}
        {isDesktop && (
          <>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <SpotifyPlayerPill playlistId="37i9dQZF1DWWQRwui0ExPn" />
            <p className="fixed text-xs text-gray-500 dark:text-gray-400 z-40" style={{ top: 'calc(25px + 3.1rem + 50px)', right: 'calc(1.5rem)', maxWidth: '155px', textAlign: 'left' }}>
              What I'm currently listening to at the moment!
            </p>
          </>
        )}
        
        {/* Mobile Layout - Only render below 1150px */}
        {!isDesktop && (
          <ResponsiveMenu isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        )}
        
        <Routes>
          <Route path="/" element={<HomePage activeTab={activeTab} setActiveTab={setActiveTab} />} />
          <Route path="/git-diff" element={<GitDiffPage />} />
          <Route path="/schemas" element={<SchemasPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/designers-code" element={<DesignersCode />} />
          <Route path="/building-portfolio" element={<BuildingPortfolioPage />} />
          <Route path="/design-systems" element={<DesignSystemsBlogPage />} />
        </Routes>
      </div>
    </Router>
  );
}