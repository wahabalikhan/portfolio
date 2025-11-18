import React, { useState } from 'react';
import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';
import { Music, SkipForward, ChevronDown } from 'lucide-react';

const SpotifyPlayerPill = ({ playlistId = null }) => {
  const { currentTrack, playNextTrack } = useSpotifyPlaylist(playlistId);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack) {
    return null;
  }

  const trackName = currentTrack.name || 'Unknown';
  const artistName = currentTrack.artists?.[0]?.name || 'Unknown';
  const albumArt = currentTrack.album?.images?.[2]?.url; // Smallest image
  const trackUrl = currentTrack.external_urls?.spotify;

  return (
    <div className="spotify-player-pill fixed top-24 right-6 z-40">
      {/* Expanded View */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-800 min-w-max w-64">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <a
            href={trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity pr-6"
          >
            {albumArt && (
              <img
                src={albumArt}
                alt={trackName}
                className="w-full h-40 rounded-md object-cover mb-3"
              />
            )}
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {trackName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {artistName}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              lofi beats 🎧
            </p>
          </a>
          <button
            onClick={playNextTrack}
            className="mt-3 w-full flex items-center gap-2 justify-center px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <SkipForward className="w-3 h-3" />
            <span className="text-xs font-medium">Next track</span>
          </button>
        </div>
      )}

      {/* Pill Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all group font-medium text-sm w-max justify-center"
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
        
        <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-xs truncate max-w-[100px]">
          {trackName}
        </span>

        <SkipForward className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
};

export default SpotifyPlayerPill;
