import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import VinylDisc from '../components/VinylDisc';
import BottomNav from '../components/BottomNav';
import { S } from '../styles';

export default function PlayerScreen({ setScreen, currentItem, fallbackItem }) {
  const item = currentItem || fallbackItem;
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(42);
  const [volume, setVolume] = useState(75);
  const [barWidth, setBarWidth] = useState(1);
  const [volWidth, setVolWidth] = useState(1);

  const progressAnim = useRef(new Animated.Value(42)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.1)), 300);
    return () => clearInterval(t);
  }, [playing]);

  const elapsed = Math.floor((progress / 100) * 218);
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  if (!item) return null;

  return (
    <View style={styles.container}>
      {/* Ambient glow */}
      <View style={[styles.glow, { backgroundColor: item.color + '20' }]} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable style={S.iconBtn} onPress={() => setScreen('home')}>
          <Feather name="arrow-left" size={17} color="#ece7e7" />
        </Pressable>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* ── Vinyl disc ── */}
      <View style={[styles.vinylWrap, { transform: [{ scale: playing ? 1 : 0.95 }] }]}>
        <VinylDisc size={270} center={item.color} rotating={playing} cover={item.cover} />
      </View>

      {/* ── Track info ── */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackArtist}>{item.artist}</Text>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackEdition}>Deluxe Edition</Text>
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressSection}>
        <View
          style={styles.progressTrack}
          onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
          onStartShouldSetResponder={() => true}
          onResponderGrant={(e) => {
            const { locationX } = e.nativeEvent;
            setProgress(Math.min(100, Math.max(0, (locationX / barWidth) * 100)));
          }}
        >
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.timeLabel}>{fmt(elapsed)}</Text>
          <Text style={styles.timeLabel}>3:38</Text>
        </View>
      </View>

      {/* ── Playback controls ── */}
      <View style={styles.controls}>
        <Pressable style={({ pressed }) => [S.iconBtn, { opacity: pressed ? 0.7 : 1 }]}>
          <Feather name="skip-back" size={18} color="#ece7e7" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.playBtn, { opacity: pressed ? 0.9 : 1 }]}
          onPress={() => setPlaying((p) => !p)}
        >
          <Feather
            name={playing ? 'pause' : 'play'}
            size={28}
            color="#000"
          />
        </Pressable>

        <Pressable style={({ pressed }) => [S.iconBtn, { opacity: pressed ? 0.7 : 1 }]}>
          <Feather name="skip-forward" size={18} color="#ece7e7" />
        </Pressable>
      </View>

      {/* ── Volume ── */}
      <View style={styles.volumeRow}>
        <Feather name="volume-2" size={14} color="rgba(255,255,255,0.35)" />
        <View
          style={styles.volumeTrack}
          onLayout={(e) => setVolWidth(e.nativeEvent.layout.width)}
          onStartShouldSetResponder={() => true}
          onResponderGrant={(e) => {
            const { locationX } = e.nativeEvent;
            setVolume(Math.round(Math.min(100, Math.max(0, (locationX / volWidth) * 100))));
          }}
        >
          <View style={[styles.volumeFill, { width: `${volume}%` }]} />
        </View>
      </View>

      {/* ── Purchase ── */}
      <Pressable
        style={({ pressed }) => [
          S.orangeBtn,
          styles.purchaseBtn,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Feather name="shopping-bag" size={16} color="#000" />
        <Text style={S.orangeBtnText}>Purchase</Text>
      </Pressable>

      <View style={{ flex: 1 }} />
      <BottomNav active="player" setScreen={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  glow: {
    position: 'absolute',
    top: '25%',
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },

  vinylWrap: {
    marginTop: 36,
  },

  trackInfo: {
    marginTop: 32,
    alignItems: 'center',
  },
  trackArtist: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  trackTitle: {
    marginTop: 6,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 32,
    textTransform: 'uppercase',
    lineHeight: 30,
    color: '#ece7e7',
    textAlign: 'center',
  },
  trackEdition: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },
  pricePill: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: 'rgba(240,90,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(240,90,0,0.35)',
  },
  priceText: {
    color: '#F05A00',
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 16,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },

  progressSection: {
    marginTop: 28,
    width: '100%',
  },
  progressTrack: {
    height: 3,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F05A00',
    borderRadius: 99,
  },
  progressLabels: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
  },

  controls: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F05A00',
    alignItems: 'center',
    justifyContent: 'center',
  },

  volumeRow: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  volumeTrack: {
    flex: 1,
    height: 3,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 99,
  },

  purchaseBtn: {
    width: '100%',
    marginTop: 24,
    height: 52,
  },
});
