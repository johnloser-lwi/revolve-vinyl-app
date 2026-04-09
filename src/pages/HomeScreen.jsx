import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import VinylDisc from '../components/VinylDisc';
import BottomNav from '../components/BottomNav';
import { S, pageVariants, pageTransition } from '../styles';

export default function HomeScreen({ albums, setScreen, setSelectedItem }) {
  const featured = albums.filter((a) => a.featured);

  function openDetails(item) {
    setSelectedItem(item);
    setScreen('details');
  }

  return (
    <motion.div
      key="home"
      style={S.phone}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(240,90,0,0.06)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={S.scroll}>
        <div style={{ ...S.px, paddingTop: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img src="/main-logo.png" alt="REVOLVE." style={{ height: 28, objectFit: 'contain' }} />
          </div>

          {/* Hero banner */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              marginTop: 20,
              borderRadius: 28,
              background: '#181818',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: -40,
                top: -40,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'rgba(240,90,0,0.12)',
                filter: 'blur(50px)',
              }}
            />
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Featured Drop
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 38,
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              Spin what
              <br />
              matters.
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.5)', maxWidth: 170 }}>
              Collect limited pressings and discover new releases.
            </div>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={S.orangeBtn}
                onClick={() => openDetails(albums[0])}
              >
                Purchase
              </motion.button>
              <div style={{ position: 'relative' }}>
                <VinylDisc size={160} center="#F05A00" />
                <div
                  style={{
                    position: 'absolute',
                    left: -28,
                    top: 28,
                    width: 100,
                    height: 100,
                    borderRadius: 18,
                    background: '#2a2a2a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={albums[0]?.cover || ''}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: albums[0]?.cover ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Drops section header */}
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
              }}
            >
              Featured Drops
            </div>
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              See all
            </div>
          </div>

          {/* Featured Drops cards */}
          <div style={{ marginTop: 14, display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8 }}>
            {featured.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 + idx * 0.07 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openDetails(item)}
                style={{ minWidth: 220, cursor: 'pointer' }}
              >
                <div
                  style={{
                    borderRadius: 26,
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: 16, height: 310, position: 'relative' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: 'rgba(255,255,255,0.4)',
                          fontFamily: "'Barlow Condensed', sans-serif",
                          letterSpacing: '0.2em',
                        }}
                      >
                        0{idx + 1}
                      </div>
                      <button style={{ ...S.iconBtn, width: 34, height: 34 }}>
                        <Heart size={14} />
                      </button>
                    </div>
                    <div style={{ position: 'absolute', right: -18, top: 50, zIndex: 1 }}>
                      <VinylDisc size={140} center={item.color} cover={item.cover} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: 16,
                        top: 78,
                        width: 128,
                        height: 128,
                        borderRadius: 18,
                        border: '1px solid rgba(255,255,255,0.08)',
                        overflow: 'hidden',
                        background: item.gradient,
                      }}
                    >
                      {item.cover && (
                        <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <div style={{ position: 'absolute', left: 16, bottom: 16, right: 16, zIndex: 2 }}>
                      <div
                        style={{
                          fontSize: 10,
                          textTransform: 'uppercase',
                          letterSpacing: '0.25em',
                          color: 'rgba(255,255,255,0.4)',
                          fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                      >
                        {item.artist}
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 900,
                          fontSize: 22,
                          textTransform: 'uppercase',
                          lineHeight: 0.95,
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ color: 'rgba(255,255,255,0.45)' }}>Limited pressing</span>
                        <span style={{ fontWeight: 700 }}>{item.price}</span>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <button
                          style={{ ...S.orangeBtn, width: '100%', padding: '10px 12px', fontSize: 11 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetails(item);
                          }}
                        >
                          Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Daily Pick */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{
              marginTop: 20,
              marginBottom: 16,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#151515',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                Daily Pick
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}
              >
                Jazz Essentials
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              style={{ ...S.orangeBtn, display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#000' }}
            >
              <Plus size={14} /> Add
            </motion.button>
          </motion.div>
        </div>
      </div>

      <BottomNav active="home" setScreen={setScreen} />
    </motion.div>
  );
}
