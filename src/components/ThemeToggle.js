import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDarkMode, toggleTheme }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-wrapper">
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
          aria-label="Toggle dark mode"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {isDarkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
        {showTooltip && (
          <div className="theme-toggle-tooltip">
            {isDarkMode ? "Light vibes" : "Dark vibes"}
          </div>
        )}
      </div>
    </div>
  );
}
