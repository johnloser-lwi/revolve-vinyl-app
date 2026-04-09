import React from 'react';

export default function AlbumCover({ item, size = 140, radius = 20 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        border: '1px solid rgba(255,255,255,0.1)',
        background: item.cover ? 'none' : item.gradient,
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}
    >
      {item.cover && (
        <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </div>
  );
}
