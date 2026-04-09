import React from 'react';
import { motion } from 'framer-motion';
import VinylDisc from '../components/VinylDisc';
import { S } from '../styles';

export default function SplashScreen({ onEnter }) {
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
