
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

export default function App() {
  // For tab state on homepage only
  const [activeTab, setActiveTab] = useState('Design');
  // ScrollToTop component handles scrolling on route change
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToTop />
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