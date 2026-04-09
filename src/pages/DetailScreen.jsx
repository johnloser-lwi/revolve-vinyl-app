import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Play } from 'lucide-react';
import VinylDisc from '../components/VinylDisc';
import BottomNav from '../components/BottomNav';
import { S, pageVariants, pageTransition } from '../styles';
import { tracks } from '../data/vinylItems';

export default function DetailScreen({ item, setScreen }) {
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

      <div style={S.scroll}>
        <div style={{ ...S.px, paddingTop: 52 }}>
          {/* Header */}
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

          {/* Album hero card */}
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
                <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

          {/* Genre tags */}
          <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {item.genre.map((tag) => (
              <div key={tag} style={S.tag}>{tag}</div>
            ))}
            <div style={S.tag}>VINYL</div>
          </div>

          {/* Tracklist */}
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

          {/* Actions */}
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
