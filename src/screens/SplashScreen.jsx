import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Animated, Pressable, StyleSheet } from 'react-native';
import VinylDisc from '../components/VinylDisc';

export default function SplashScreen({ onEnter }) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Pressable style={styles.container} onPress={onEnter}>
      <Animated.View style={[styles.inner, { opacity: fadeIn }]}>
        {/* Ambient glow */}
        <View style={styles.glow} />

        {/* Watermark */}
        <Text style={styles.watermark}>REVOLVE.</Text>

        {/* Vinyl disc */}
        <View style={{ marginTop: 100 }}>
          <VinylDisc size={260} center="#F05A00" />
        </View>

        {/* Logo + taglines */}
        <View style={{ marginTop: 36, alignItems: 'center' }}>
          <Image
            source={require('../../assets/main-logo.png')}
            style={{ height: 44, width: 180 }}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Discover vinyl culture</Text>
          <Text style={styles.tagline}>Bold, collectible, music-first.</Text>
        </View>

        {/* Blinking prompt */}
        <Animated.Text style={[styles.tapText, { opacity: blink }]}>
          Tap to enter
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(240,90,0,0.12)',
    top: '25%',
    alignSelf: 'center',
  },
  watermark: {
    position: 'absolute',
    top: 80,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 80,
    letterSpacing: -1.6,
    color: '#ece7e7',
    opacity: 0.05,
    alignSelf: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 4.2,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  tagline: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
  },
  tapText: {
    position: 'absolute',
    bottom: 48,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.3)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
});
