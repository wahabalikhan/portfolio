# Spotify Integration Setup

## Quick Setup Instructions

### 1. Get Spotify API Credentials
- Go to https://developer.spotify.com/dashboard
- Sign up or log in with your Spotify account
- Create a new app (accept the terms)
- You'll get a **Client ID** and **Client Secret**

### 2. Add Credentials to `.env.local`
Update the `.env.local` file in your project root:

```
VITE_SPOTIFY_CLIENT_ID=your_actual_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_actual_client_secret
```

### 3. How It Works
- Uses Spotify's **Client Credentials Flow** (no user authentication needed)
- Shows random tracks from a playlist
- Displays album art, track name, and artist
- Click to open track on Spotify
- Skip button to show another random track
- Silently fails if API is unreachable (won't break your site)

### 4. Customizing the Playlist
In `src/components/SpotifyPlayer.js`, change the `playlistId`:
```javascript
<SpotifyPlayer playlistId="your_playlist_id" />
```

Or use the default (Spotify's Today's Top Hits) by not passing any ID.

### 5. Finding Your Playlist ID
1. Open any Spotify playlist
2. Click share → copy link
3. The ID is the last part: `spotify:playlist:37i9dQZF1DXcBWIGoYsB37`
   - So the ID is: `37i9dQZF1DXcBWIGoYsB37`

## Design Features
- Minimal, clean player
- Dark mode support
- Shows personality without overpowering
- Smooth animations and hover effects
- Responsive design
- Graceful error handling

Enjoy! 🎵
