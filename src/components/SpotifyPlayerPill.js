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
    <div className="spotify-player-pill fixed right-6 z-40" style={{ top: 'calc(25px + 3.1rem)' }}>
      {/* Expanded View */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 rounded-lg p-4 shadow-lg border min-w-max w-64 spotify-player-modal">
          <div className="flex justify-between items-start mb-3 w-full">
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
                  className="w-full h-40 rounded-md object-cover mb-3"
                />
              )}
              <p className="text-sm font-semibold spotify-player-modal-title truncate">
                {trackName}
              </p>
              <p className="text-xs spotify-player-modal-artist truncate">
                {artistName}
              </p>
              <p className="text-xs spotify-player-modal-label mt-2">
                lofi beats 🎧
              </p>
            </a>
            <button
              onClick={() => setIsExpanded(false)}
              className="ml-2 p-0.5 rounded transition-colors spotify-player-modal-button"
            >
              <ChevronDown className="w-4 h-4 spotify-player-modal-icon" />
            </button>
          </div>
          <button
            onClick={playNextTrack}
            className="mt-3 flex items-center gap-2 justify-center px-3 py-2 rounded-md transition-colors spotify-player-next-button"
            style={{ width: '100%' }}
          >
            <SkipForward className="w-3 h-3" />
            <span className="text-xs font-medium">Next track</span>
          </button>
        </div>
      )}

      {/* Pill Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="spotify-player-pill-button"
        style={{ minWidth: '160px', maxWidth: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
    </div>
  );
};

export default SpotifyPlayerPill;
