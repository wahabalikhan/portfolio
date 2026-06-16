import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <div className="theme-toggle-container">
      <div className="ftip-wrap theme-toggle-wrapper">
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="ftip ftip-below">
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </div>
      </div>
    </div>
  );
}
