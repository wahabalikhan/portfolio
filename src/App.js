import React, { useState, useEffect} from 'react';
import HomePage from './pages/HomePage';
import GitDiffPage from './pages/GitDiffPage';
import SchemasPage from './pages/SchemasPage';
import DesignSystemPage from './pages/DesignSystemPage';
import DesignersCode from './pages/DesignersCode';
import BuildingPortfolioPage from './pages/BuildingPortfolioPage';
import DesignSystemsBlogPage from './pages/DesignSystemsBlogPage';

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [activeTab, setActiveTab] = useState('designer');

    // Scroll to top whenever page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} activeTab={activeTab} setActiveTab={setActiveTab} />;
            case 'git-diff':
                return <GitDiffPage setCurrentPage={setCurrentPage} />;
            case 'schemas':
                return <SchemasPage setCurrentPage={setCurrentPage} />;
            case 'design-system':
                return <DesignSystemPage setCurrentPage={setCurrentPage} />;
            case 'designers-code':
                return <DesignersCode setCurrentPage={setCurrentPage} />;
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