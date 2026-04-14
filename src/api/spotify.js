import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';

let _token = null;
let _tokenExpiry = 0;

const getAccessToken = async () => {
  if (_token && Date.now() < _tokenExpiry) return _token;

  const encoded = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + encoded,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`Spotify auth failed: ${res.status}`);

  const data = await res.json();
  _token = data.access_token;
  _tokenExpiry = Date.now() + data.expires_in * 1000 - 60_000;
  return _token;
};

export const getAlbum = async (id) => {
  const token = await getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Failed to fetch album ${id}: ${res.status}`);

  const data = await res.json();
  return {
    name: data.name,
    artist: data.artists.map((a) => a.name).join(', '),
    cover: data.images[0]?.url ?? null,
    genre: data.genres,
    tracks: data.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      trackNumber: t.track_number,
      duration: t.duration_ms,
      artists: t.artists.map((a) => a.name).join(', '),
    })),
  };
};

export const getTrack = async (id) => {
  const token = await getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Failed to fetch track ${id}: ${res.status}`);

  const data = await res.json();
  return {
    name: data.name,
    artist: data.artists.map((a) => a.name).join(', '),
    cover: data.album.images[0]?.url ?? null,
    genre: data.album.genres ?? [],
    duration: data.duration_ms,
  };
};
