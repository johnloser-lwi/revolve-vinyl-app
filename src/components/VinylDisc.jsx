import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function VinylDisc({ size = 220, center = '#F05A00', rotating = true, cover = null }) {
  const rings = useMemo(() => Array.from({ length: 11 }, (_, i) => i), []);

  return (
    <motion.div
      style={{ width: size, height: size, position: 'relative', borderRadius: '50%', flexShrink: 0 }}
      animate={rotating ? { rotate: 360 } : undefined}
      transition={rotating ? { repeat: Infinity, duration: 9, ease: 'linear' } : undefined}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, #0b0b0b 0%, #090909 32%, #151515 56%, #0a0a0a 100%)',
          boxShadow: '0 28px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {cover && (
          <img
            src={cover}
            alt="album"
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              width: '80%',
              height: '80%',
              objectFit: 'cover',
              opacity: 0.35,
              mixBlendMode: 'luminosity',
            }}
          />
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, rgba(255,255,255,0.22), rgba(255,255,255,0.02), rgba(255,255,255,0.18), rgba(255,255,255,0.02), rgba(255,255,255,0.22))',
          mixBlendMode: 'screen',
          opacity: 0.8,
        }}
      />

      {rings.map((ring) => (
        <div
          key={ring}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            inset: 16 + ring * ((size - 70) / 30),
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: '50%',
          background: center,
          boxShadow: `0 0 20px ${center}55, inset 0 0 0 1px rgba(255,255,255,0.08)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: size * 0.05,
          height: size * 0.05,
          borderRadius: '50%',
          background: '#f0f0f0',
        }}
      />
    </motion.div>
  );
}
