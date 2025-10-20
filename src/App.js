import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GitDiffPage from './pages/GitDiffPage';
import SchemasPage from './pages/SchemasPage';
import DesignSystemPage from './pages/DesignSystemPage';
import KeepingBarHighPage from './pages/KeepingBarHighPage';
import BuildingPortfolioPage from './pages/BuildingPortfolioPage';
import DesignSystemsBlogPage from './pages/DesignSystemsBlogPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('designer');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'git-diff':
        return <GitDiffPage setCurrentPage={setCurrentPage} />;
      case 'schemas':
        return <SchemasPage setCurrentPage={setCurrentPage} />;
      case 'design-system':
        return <DesignSystemPage setCurrentPage={setCurrentPage} />;
      case 'keeping-bar-high':
        return <KeepingBarHighPage setCurrentPage={setCurrentPage} />;
      case 'building-portfolio':
        return <BuildingPortfolioPage setCurrentPage={setCurrentPage} />;
      case 'design-systems':
        return <DesignSystemsBlogPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}