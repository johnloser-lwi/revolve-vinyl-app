import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VinylDisc from '../components/VinylDisc';
import AlbumCover from '../components/AlbumCover';
import BottomNav from '../components/BottomNav';
import { S, pageVariants, pageTransition } from '../styles';

export default function DiscoverScreen({ albums, setScreen, setSelectedItem }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = ['ALL', ...new Set(albums.flatMap((a) => a.genre))];

  const filtered =
    activeFilter === 'ALL'
      ? albums
      : albums.filter((v) => v.genre.some((g) => g.includes(activeFilter)));

  function openDetails(item) {
    setSelectedItem(item);
    setScreen('details');
  }

  return (
    <motion.div
      key="discover"
      style={S.phone}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div style={S.scroll}>
        <div style={{ ...S.px, paddingTop: 52 }}>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              textTransform: 'uppercase',
              lineHeight: 0.95,
            }}
          >
            Discover
          </div>
          <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            Explore records by mood, era, and genre.
          </div>

          {/* Filter pills */}
          <div style={{ marginTop: 16, display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {filters.map((f) => (
              <motion.button
                key={f}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActiveFilter(f)}
                style={{
                  borderRadius: 999,
                  padding: '7px 16px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  textTransform: 'uppercase',
                  background: activeFilter === f ? '#F05A00' : 'rgba(255,255,255,0.05)',
                  border: activeFilter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: activeFilter === f ? '#000' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {f}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, paddingBottom: 20 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openDetails(item)}
                  style={{
                    borderRadius: 22,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: '#161616',
                    padding: 12,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 244,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ position: 'absolute', right: -22, top: 36 }}>
                    <VinylDisc size={100} center={item.color} cover={item.cover} />
                  </div>
                  <AlbumCover item={item} size={90} radius={16} />
                  <div
                    style={{
                      marginTop: 32,
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.22em',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    {item.artist}
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: 17,
                      textTransform: 'uppercase',
                      lineHeight: 0.95,
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{item.price}</div>

                  <button
                    style={{ ...S.orangeBtn, marginTop: 10, width: '100%', padding: '9px 12px', fontSize: 11 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(item);
                    }}
                  >
                    Purchase
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <BottomNav active="discover" setScreen={setScreen} />
    </motion.div>
  );
}
