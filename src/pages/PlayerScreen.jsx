import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, SkipBack, SkipForward, Play, Pause, Volume2, ShoppingBag } from 'lucide-react';
import VinylDisc from '../components/VinylDisc';
import BottomNav from '../components/BottomNav';
import { S, pageVariants, pageTransition } from '../styles';
export default function PlayerScreen({ setScreen, currentItem, fallbackItem }) {
  const item = currentItem || fallbackItem;
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

      {/* Header */}
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

      {/* Vinyl */}
      <motion.div
        style={{ marginTop: 36, flexShrink: 0 }}
        animate={{ scale: playing ? 1 : 0.95 }}
        transition={{ duration: 0.4 }}
      >
        <VinylDisc size={270} center={item.color} rotating={playing} cover={item.cover} />
      </motion.div>

      {/* Track info */}
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

      {/* Progress bar */}
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

      {/* Playback controls */}
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

      {/* Volume */}
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

      {/* Purchase */}
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
