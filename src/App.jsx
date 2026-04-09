import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './pages/SplashScreen';
import HomeScreen from './pages/HomeScreen';
import DetailScreen from './pages/DetailScreen';
import DiscoverScreen from './pages/DiscoverScreen';
import PlayerScreen from './pages/PlayerScreen';
import LibraryScreen from './pages/LibraryScreen';
import VinylDisc from './components/VinylDisc';
import { useAlbums } from './data/useAlbums';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const { albums, loading, error } = useAlbums();

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
        {/* Notch */}
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
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                color: '#ece7e7',
                background: '#111111',
              }}
            >
              <VinylDisc size={100} center="#F05A00" />
              <div
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                Loading catalogue…
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: 32,
                color: '#ece7e7',
                background: '#111111',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 22,
                  textTransform: 'uppercase',
                }}
              >
                Failed to load
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{error.message}</div>
            </motion.div>
          ) : screen === 'home' ? (
            <HomeScreen key="home" albums={albums} setScreen={setScreen} setSelectedItem={setSelectedItem} />
          ) : screen === 'details' ? (
            <DetailScreen key="details" item={selectedItem} setScreen={setScreen} />
          ) : screen === 'discover' ? (
            <DiscoverScreen key="discover" albums={albums} setScreen={setScreen} setSelectedItem={setSelectedItem} />
          ) : screen === 'player' ? (
            <PlayerScreen key="player" setScreen={setScreen} currentItem={selectedItem} fallbackItem={albums[0]} />
          ) : screen === 'library' ? (
            <LibraryScreen key="library" albums={albums} setScreen={setScreen} setSelectedItem={setSelectedItem} />
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
