import React from 'react';
import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';
import { Music, SkipForward } from 'lucide-react';

const SpotifyPlayer = ({ playlistId = null }) => {
  const { currentTrack, isLoading, error, playNextTrack } = useSpotifyPlaylist(playlistId);

  if (isLoading) {
    return (
      <div className="spotify-player bg-white dark:bg-gray-900 rounded-lg p-4 w-full max-w-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail
  }

  if (!currentTrack) {
    return null;
  }

  const artistName = currentTrack.artists?.[0]?.name || 'Unknown Artist';
  const trackName = currentTrack.name || 'Unknown Track';
  const albumArt = currentTrack.album?.images?.[0]?.url;
  const trackUrl = currentTrack.external_urls?.spotify;

  return (
    <div className="spotify-player">
      <a
        href={trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white dark:bg-gray-900 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-gray-200 dark:border-gray-800 group"
      >
        <div className="flex items-start gap-3">
          {/* Album Art */}
          <div className="flex-shrink-0 relative">
            {albumArt ? (
              <img
                src={albumArt}
                alt={trackName}
                className="w-14 h-14 rounded-md object-cover shadow-sm group-hover:shadow-md transition-shadow"
              />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-md flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
            )}
            {/* Spotify Badge */}
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ♪
            </div>
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {trackName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {artistName}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              lofi beats 🎧
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              playNextTrack();
            }}
            className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Skip to next track"
          >
            <SkipForward className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </a>
    </div>
  );
};

export default SpotifyPlayer;
