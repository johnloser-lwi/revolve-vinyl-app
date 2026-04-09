import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, Disc3, Library } from 'lucide-react';

const items = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'discover', icon: Compass, label: 'Discover' },
  { id: 'player', icon: Disc3, label: 'Player' },
  { id: 'library', icon: Library, label: 'Library' },
];

export default function BottomNav({ active, setScreen }) {
  return (
    <div style={{ padding: '8px 12px 12px', flexShrink: 0 }}>
      <div
        style={{
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(21,21,21,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '8px 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setScreen(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                width: 68,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#F05A00' : 'rgba(255,255,255,0.4)',
                padding: '4px 0',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? 'rgba(240,90,0,0.15)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                <Icon size={18} />
              </div>
              <div
                style={{
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                }}
              >
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
