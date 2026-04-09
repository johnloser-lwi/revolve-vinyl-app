import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Home,
  Compass,
  Disc3,
  Library,
  Play,
  SkipBack,
  SkipForward,
  Plus,
  Pause,
  Volume2,
  ShoppingBag,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const vinylItems = [
  {
    id: 1,
    artist: 'LADY GAGA',
    title: 'MAYHEM',
    genre: ['POP', 'DARK POP'],
    price: '$40',
    color: '#d9d9d9',
    cover: '/albums/gaga.png',
    gradient: 'linear-gradient(135deg,#2a2a2a,#0d0d0d)',
  },
  {
    id: 2,
    artist: 'BILLIE EILISH',
    title: 'HIT ME HARD AND SOFT',
    genre: ['ALT POP', 'POP'],
    price: '$34',
    color: '#d9d9d9',
    cover: '/albums/billie.webp',
    gradient: 'linear-gradient(135deg,#2d2d2d,#0f0f0f)',
  },
  {
    id: 3,
    artist: 'RIHANNA',
    title: 'ANTI',
    genre: ['R&B', 'POP'],
    price: '$38',
    color: '#c0392b',
    cover: '/albums/rihanna.webp',
    gradient: 'linear-gradient(135deg,#7a0000,#1a0000)',
  },
  {
    id: 4,
    artist: 'DOECHII',
    title: 'ALLIGATOR BITES NEVER HEAL',
    genre: ['HIP HOP', 'RAP'],
    price: '$42',
    color: '#2d5a27',
    cover: '/albums/doechii.jpg',
    gradient: 'linear-gradient(135deg,#1a3a17,#0d0d0d)',
  },
  {
    id: 5,
    artist: 'JUSTIN BIEBER',
    title: 'JOURNALS',
    genre: ['R&B', 'POP'],
    price: '$31',
    color: '#9b59b6',
    cover: '/albums/journals.jpg',
    gradient: 'linear-gradient(135deg,#4a1a6b,#1a0a2a)',
  },
  {
    id: 6,
    artist: 'SABRINA CARPENTER',
    title: "MAN'S BEST FRIEND",
    genre: ['POP'],
    price: '$33',
    color: '#e8b4a0',
    cover: '/albums/sabrina.webp',
    gradient: 'linear-gradient(135deg,#8b3a2a,#3a1510)',
  },
];

const tracks = [
  ['01', 'Intro / Static', '1:42'],
  ['02', 'Night Drive', '3:38'],
  ['03', 'Soft Frequency', '4:11'],
  ['04', 'Afterlight', '3:26'],
  ['05', 'Last Call', '5:03'],
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function VinylDisc({ size = 220, center = '#F05A00', rotating = true, cover = null }) {
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

function AlbumCover({ item, size = 140, radius = 20 }) {
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

const S = {
  phone: {
    width: '100%',
    height: '100%',
    background: '#111111',
    color: '#ece7e7',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  px: { paddingLeft: 20, paddingRight: 20 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#ece7e7',
    flexShrink: 0,
  },
  orangeBtn: {
    background: '#F05A00',
    color: '#000',
    border: 'none',
    borderRadius: 999,
    padding: '10px 20px',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 13,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  tag: {
    borderRadius: 999,
    border: '1px solid rgba(240,90,0,0.4)',
    background: 'rgba(240,90,0,0.1)',
    padding: '6px 14px',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#ff7f2f',
    fontFamily: "'Barlow Condensed', sans-serif",
  },
};

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const pageTransition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] };

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────

function BottomNav({ active, setScreen }) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'player', icon: Disc3, label: 'Player' },
    { id: 'library', icon: Library, label: 'Library' },
  ];

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

// ─── SPLASH ──────────────────────────────────────────────────────────────────

function SplashScreen({ onEnter }) {
  return (
    <motion.div
      key="splash"
      style={{ ...S.phone, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      onClick={onEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          position: 'absolute',
          top: 100,
          opacity: 0.05,
          pointerEvents: 'none',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 90,
          letterSpacing: '-0.02em',
          color: '#ece7e7',
          whiteSpace: 'nowrap',
        }}
      >
        REVOLVE.
      </div>

      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(240,90,0,0.12)',
          filter: 'blur(80px)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <VinylDisc size={260} center="#F05A00" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 36, textAlign: 'center' }}
      >
        <img src="/main-logo.png" alt="REVOLVE." style={{ height: 44, objectFit: 'contain' }} />
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.35em',
            color: 'rgba(255,255,255,0.55)',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          Discover vinyl culture
        </div>
        <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
          Bold, collectible, music-first.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 48,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        Tap to enter
      </motion.div>
    </motion.div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeScreen({ setScreen, setSelectedItem }) {
  const featured = vinylItems.slice(0, 3);

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

      <div style={{ ...S.scroll }}>
        <div style={{ ...S.px, paddingTop: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img src="/main-logo.png" alt="REVOLVE." style={{ height: 28, objectFit: 'contain' }} />
          </div>

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
                onClick={() => openDetails(vinylItems[0])}
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
                    src={vinylItems[0].cover || ''}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: vinylItems[0].cover ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

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
                      {item.cover && <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
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
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <button
                          style={{
                            ...S.orangeBtn,
                            flex: 1,
                            padding: '10px 12px',
                            fontSize: 11,
                          }}
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
              style={{
                ...S.orangeBtn,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: '#fff',
                color: '#000',
              }}
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

// ─── DETAIL ──────────────────────────────────────────────────────────────────

function DetailScreen({ item, setScreen }) {
  const [liked, setLiked] = useState(false);

  if (!item) return null;

  return (
    <motion.div
      key="details"
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
          top: 0,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: `${item.color}18`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ ...S.scroll }}>
        <div style={{ ...S.px, paddingTop: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={S.iconBtn} onClick={() => setScreen('home')}>
              <ArrowLeft size={17} />
            </button>
            <div
              style={{
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Vinyl Details
            </div>
            <motion.button
              style={{
                ...S.iconBtn,
                color: liked ? '#F05A00' : '#ece7e7',
                borderColor: liked ? 'rgba(240,90,0,0.4)' : 'rgba(255,255,255,0.1)',
              }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setLiked((v) => !v)}
            >
              <Heart size={17} fill={liked ? '#F05A00' : 'none'} />
            </motion.button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 }}
            style={{
              marginTop: 20,
              borderRadius: 30,
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#171717',
              padding: 20,
              position: 'relative',
              overflow: 'hidden',
              height: 310,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 52,
                width: 180,
                height: 180,
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                background: item.gradient,
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}
            >
              {item.cover && (
                <img
                  src={item.cover}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
            <div style={{ position: 'absolute', right: -16, top: 16 }}>
              <VinylDisc size={240} center={item.color} cover={item.cover} />
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
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
                  fontSize: 36,
                  textTransform: 'uppercase',
                  lineHeight: 0.9,
                }}
              >
                {item.title}
              </div>

              <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                Premium pressing / deluxe edition
              </div>

              <div
                style={{
                  marginTop: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: 'rgba(240,90,0,0.12)',
                  border: '1px solid rgba(240,90,0,0.35)',
                  color: '#F05A00',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {item.price}
              </div>
            </div>
          </motion.div>

          <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {item.genre.map((tag) => (
              <div key={tag} style={S.tag}>
                {tag}
              </div>
            ))}
            <div style={S.tag}>VINYL</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                textTransform: 'uppercase',
              }}
            >
              Tracklist
            </div>
            <div
              style={{
                marginTop: 10,
                borderRadius: 22,
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#151515',
                overflow: 'hidden',
              }}
            >
              {tracks.map((track, index) => (
                <motion.div
                  key={track[0]}
                  whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderBottom: index !== tracks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.3)',
                        width: 20,
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {track[0]}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{track[1]}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{track[2]}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20, marginBottom: 20 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                ...S.orangeBtn,
                flex: 1,
                height: 52,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <ShoppingBag size={16} />
              Purchase
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setScreen('player')}
              style={{
                flex: 1,
                height: 52,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                color: '#ece7e7',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 13,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <Play size={16} />
              Review
            </motion.button>
          </div>
        </div>
      </div>

      <BottomNav active="home" setScreen={setScreen} />
    </motion.div>
  );
}

// ─── DISCOVER ─────────────────────────────────────────────────────────────────

function DiscoverScreen({ setScreen, setSelectedItem }) {
  const filters = ['ALL', 'HIP HOP', 'ROCK', 'JAZZ', 'ELECTRONIC', 'R&B'];
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? vinylItems
    : vinylItems.filter((v) => v.genre.includes(activeFilter));

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
      <div style={{ ...S.scroll }}>
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
                  onClick={() => {
                    setSelectedItem(item);
                    setScreen('details');
                  }}
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
                    style={{
                      ...S.orangeBtn,
                      marginTop: 10,
                      width: '100%',
                      padding: '9px 12px',
                      fontSize: 11,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                      setScreen('details');
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

// ─── PLAYER ──────────────────────────────────────────────────────────────────

function PlayerScreen({ setScreen, currentItem }) {
  const item = currentItem || vinylItems[0];
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(42);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.1)), 300);
    return () => clearInterval(t);
  }, [playing]);

  const elapsed = Math.floor((progress / 100) * 218);
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <motion.div
      key="player"
      style={{ ...S.phone, alignItems: 'center', paddingLeft: 24, paddingRight: 24, paddingTop: 52 }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `${item.color}20`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button style={S.iconBtn} onClick={() => setScreen('home')}>
          <ArrowLeft size={17} />
        </button>
        <div
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          Now Playing
        </div>
        <div style={{ width: 40 }} />
      </div>

      <motion.div
        style={{ marginTop: 36, flexShrink: 0 }}
        animate={{ scale: playing ? 1 : 0.95 }}
        transition={{ duration: 0.4 }}
      >
        <VinylDisc size={270} center={item.color} rotating={playing} cover={item.cover} />
      </motion.div>

      <motion.div
        key={item.id}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginTop: 32, textAlign: 'center', flexShrink: 0 }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          {item.artist}
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 32,
            textTransform: 'uppercase',
            lineHeight: 0.95,
          }}
        >
          {item.title}
        </div>
        <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Deluxe Edition</div>

        <div
          style={{
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(240,90,0,0.12)',
            border: '1px solid rgba(240,90,0,0.35)',
            color: '#F05A00',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {item.price}
        </div>
      </motion.div>

      <div style={{ marginTop: 28, width: '100%', flexShrink: 0 }}>
        <div
          style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', cursor: 'pointer' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          <motion.div
            style={{ height: '100%', background: '#F05A00', borderRadius: 99 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          <span>{fmt(elapsed)}</span>
          <span>3:38</span>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
        <motion.button whileTap={{ scale: 0.88 }} style={S.iconBtn}>
          <SkipBack size={18} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setPlaying((p) => !p)}
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#F05A00',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(240,90,0,0.4)',
          }}
        >
          {playing ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" size={28} />}
        </motion.button>
        <motion.button whileTap={{ scale: 0.88 }} style={S.iconBtn}>
          <SkipForward size={18} />
        </motion.button>
      </div>

      <div style={{ marginTop: 24, width: '100%', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <Volume2 size={14} style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
        <div
          style={{ flex: 1, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
          }}
        >
          <div style={{ height: '100%', width: `${volume}%`, background: 'rgba(255,255,255,0.5)', borderRadius: 99 }} />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          ...S.orangeBtn,
          width: '100%',
          marginTop: 24,
          height: 52,
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <ShoppingBag size={16} />
        Purchase
      </motion.button>

      <div style={{ flex: 1 }} />
      <BottomNav active="player" setScreen={setScreen} />
    </motion.div>
  );
}

// ─── LIBRARY ──────────────────────────────────────────────────────────────────

function LibraryScreen({ setScreen, setSelectedItem }) {
  const collection = vinylItems.slice(2);

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
      <div style={{ ...S.scroll }}>
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
                onClick={() => {
                  setSelectedItem(item);
                  setScreen('details');
                }}
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
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F05A00' }}>{item.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="library" setScreen={setScreen} />
    </motion.div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0d0d0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#111111',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 30,
            borderRadius: 16,
            background: '#0d0d0d',
            zIndex: 100,
          }}
        />

        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" onEnter={() => setShowSplash(false)} />
          ) : screen === 'home' ? (
            <HomeScreen key="home" setScreen={setScreen} setSelectedItem={setSelectedItem} />
          ) : screen === 'details' ? (
            <DetailScreen key="details" item={selectedItem} setScreen={setScreen} />
          ) : screen === 'discover' ? (
            <DiscoverScreen key="discover" setScreen={setScreen} setSelectedItem={setSelectedItem} />
          ) : screen === 'player' ? (
            <PlayerScreen key="player" setScreen={setScreen} currentItem={selectedItem} />
          ) : screen === 'library' ? (
            <LibraryScreen key="library" setScreen={setScreen} setSelectedItem={setSelectedItem} />
          ) : null}
        </AnimatePresence>
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -1,
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(240,90,0,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(240,90,0,0.04) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}