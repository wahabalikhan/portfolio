// Spotify Web API service
// Uses Client Credentials Flow for non-user-specific data

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

console.log('Spotify credentials loaded:', {
  clientId: SPOTIFY_CLIENT_ID ? 'loaded' : 'missing',
  secret: SPOTIFY_CLIENT_SECRET ? 'loaded' : 'missing',
});

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  // Check if we have a valid cached token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const auth = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify token error:', errorData);
      throw new Error('Failed to get Spotify access token');
    }

    const data = await response.json();
    accessToken = data.access_token;
    // Set expiry slightly before actual expiry for safety margin
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return null;
  }
};

export const getUserTopTrack = async (userId) => {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/top/tracks?limit=1&time_range=short_term`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top track');
    }

    const data = await response.json();
    return data.items?.[0] || null;
  } catch (error) {
    console.error('Error fetching user top track:', error);
    return null;
  }
};

export const getPlaylistTracks = async (playlistId) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      console.error('No Spotify token available');
      return null;
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify playlist error:', errorData);
      // Fallback to search if playlist fails
      return await getFallbackTracks();
    }

    const data = await response.json();
    console.log('Playlist response:', data);
    
    // Extract track objects from the items array
    const trackList = data.items
      ?.map(item => item.track)
      .filter(track => track !== null && track !== undefined) || [];
    
    console.log('Extracted tracks:', trackList.length);
    
    if (trackList.length === 0) {
      console.warn('No valid tracks in playlist, trying fallback');
      return await getFallbackTracks();
    }
    
    return trackList;
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return await getFallbackTracks();
  }
};

const getFallbackTracks = async () => {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    // Fallback: search for lofi beats
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=lofi+beats&type=track&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.tracks?.items || null;
  } catch (error) {
    console.error('Error in fallback tracks:', error);
    return null;
  }
};

export const getTrackDetails = async (trackId) => {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch track details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching track details:', error);
    return null;
  }
};
