import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';
import { Music, SkipForward, ChevronDown, Play } from 'lucide-react';

export default function ResponsiveMenu({ isDarkMode, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTrack, playNextTrack } = useSpotifyPlaylist('37i9dQZF1DWWQRwui0ExPn');
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack) {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="w-5 h-5 text-gray-900 dark:text-white" />
        )}
      </button>
    );
  }

  const trackName = currentTrack.name || 'Unknown';
  const artistName = currentTrack.artists?.[0]?.name || 'Unknown';
  const albumArt = currentTrack.album?.images?.[2]?.url;
  const trackUrl = currentTrack.external_urls?.spotify;

  return (
    <>
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="w-5 h-5 text-gray-900 dark:text-white" />
        )}
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div className="fixed top-16 right-6 z-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-4" style={{ width: '12rem' }}>
          <div className="space-y-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-button w-full"
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
            
            {/* Spotify Player Section */}
            <div>
              {/* Spotify Pill Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="spotify-player-pill-button w-full"
                style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minWidth: '160px', maxWidth: '140px' }}
              >
                <div className="relative w-5 h-5">
                  {albumArt ? (
                    <img
                      src={albumArt}
                      alt={trackName}
                      className="w-5 h-5 rounded object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center">
                      <Music className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                
                <span className="spotify-player-pill-text">
                  {trackName}
                </span>

                <SkipForward className="w-3.5 h-3.5 spotify-player-pill-icon" />
              </button>

              {/* Expanded Spotify Player */}
              {isExpanded && (
                <div className="mt-4 rounded-lg p-3 border spotify-player-modal">
                  <div className="flex justify-between items-start mb-2 w-full">
                    <a
                      href={trackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 hover:opacity-80 transition-opacity"
                    >
                      {albumArt && (
                        <img
                          src={albumArt}
                          alt={trackName}
                          className="w-full h-24 rounded-md object-cover mb-2"
                        />
                      )}
                      <p className="text-xs font-semibold spotify-player-modal-title truncate">
                        {trackName}
                      </p>
                      <p className="text-xs spotify-player-modal-artist truncate">
                        {artistName}
                      </p>
                      <p className="text-xs spotify-player-modal-label mt-1">
                        lofi beats 🎧
                      </p>
                    </a>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="ml-1 p-0.5 rounded transition-colors spotify-player-modal-button"
                    >
                      <ChevronDown className="w-3 h-3 spotify-player-modal-icon" />
                    </button>
                  </div>
                  <button
                    onClick={playNextTrack}
                    className="mt-2 flex items-center gap-2 justify-center px-2 py-1.5 rounded-md transition-colors spotify-player-next-button text-xs"
                    style={{ width: '100%' }}
                  >
                    <SkipForward className="w-2.5 h-2.5" />
                    <span className="text-xs font-medium">Next track</span>
                  </button>
                  <a
                    href={trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 justify-center px-2 py-1.5 rounded-md transition-colors spotify-player-play-button text-xs"
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span className="text-xs font-medium">Play on Spotify</span>
                  </a>
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-left">
                What I'm currently listening to at the moment!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
