import { useState, useEffect } from 'react';
import { getPlaylistTracks } from '../services/spotifyService';

// Spotify's Lofi Beats playlist
const DEFAULT_PLAYLIST_ID = '37i9dQZF1DWWQRwui0ExPn';

export const useSpotifyPlaylist = (playlistId = DEFAULT_PLAYLIST_ID) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const fetchedTracks = await getPlaylistTracks(playlistId);
        
        if (fetchedTracks && fetchedTracks.length > 0) {
          setTracks(fetchedTracks);
          // Set a random track as current to show
          const randomIndex = Math.floor(Math.random() * fetchedTracks.length);
          setCurrentTrack(fetchedTracks[randomIndex]);
          setError(null);
        } else {
          setError('No tracks found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading Spotify playlist:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [playlistId]);

  const playNextTrack = () => {
    if (tracks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrack(tracks[randomIndex]);
  };

  return {
    currentTrack: currentTrack || null,
    tracks,
    isLoading,
    error,
    playNextTrack,
  };
};
