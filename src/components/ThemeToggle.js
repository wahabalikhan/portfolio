import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <div className="theme-toggle-container">
      <button
        onClick={toggleTheme}
        className="theme-toggle-button"
        style={{ minWidth: '160px', maxWidth: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        aria-label="Toggle dark mode"
        title={isDarkMode ? "Let there be light ☀️" : "Embrace the darkness 🌙"}
      >
        {isDarkMode ? (
          <>
            <Sun className="w-4 h-4" />
            <span>Light vibes</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4" />
            <span>Dark vibes</span>
          </>
        )}
      </button>
    </div>
  );
}
