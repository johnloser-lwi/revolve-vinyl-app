import React from 'react';
import { motion } from 'framer-motion';
import AlbumCover from '../components/AlbumCover';
import BottomNav from '../components/BottomNav';
import { S, pageVariants, pageTransition } from '../styles';
import { vinylItems } from '../data/vinylItems';

export default function LibraryScreen({ setScreen, setSelectedItem }) {
  const collection = vinylItems.slice(2);

  function openDetails(item) {
    setSelectedItem(item);
    setScreen('details');
  }

  return (
    <motion.div
      key="library"
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
            }}
          >
            Library
          </div>
          <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>Your collected pressings.</div>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 20 }}>
            {collection.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.06 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => openDetails(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  borderRadius: 20,
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: '12px 14px',
                  cursor: 'pointer',
                }}
              >
                <AlbumCover item={item} size={60} radius={12} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    {item.artist}
                  </div>
                  <div
                    style={{
                      marginTop: 2,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: 18,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ marginTop: 4, display: 'flex', gap: 6 }}>
                    {item.genre.map((g) => (
                      <span
                        key={g}
                        style={{
                          fontSize: 9,
                          color: 'rgba(255,255,255,0.35)',
                          letterSpacing: '0.15em',
                          fontFamily: "'Barlow Condensed', sans-serif",
                          textTransform: 'uppercase',
                        }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#F05A00',
                  }}
                >
                  {item.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="library" setScreen={setScreen} />
    </motion.div>
  );
}
