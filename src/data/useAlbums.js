import { useState, useEffect } from 'react';
import { getAlbum } from '../api/spotify';
import albumList from './album-list.json';

const fmtDuration = (ms) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export function useAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const results = await Promise.all(
          albumList.albums.map(async (entry, idx) => {
            const data = await getAlbum(entry.spotifyId);
            return {
              id: idx + 1,
              artist: data.artist.toUpperCase(),
              title: data.name.toUpperCase(),
              genre: entry.genre.map((g) => g.toUpperCase()),
              price: entry.price,
              featured: entry.featured,
              color: '#d9d9d9',
              cover: data.cover,
              gradient: 'linear-gradient(135deg,#2a2a2a,#0d0d0d)',
              tracks: data.tracks.map((t) => ({
                number: String(t.trackNumber).padStart(2, '0'),
                name: t.name,
                duration: fmtDuration(t.duration),
              })),
            };
          })
        );
        setAlbums(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { albums, loading, error };
}
