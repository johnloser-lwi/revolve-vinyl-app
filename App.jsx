import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  BarlowCondensed_400Regular,
  BarlowCondensed_700Bold,
  BarlowCondensed_900Black,
} from '@expo-google-fonts/barlow-condensed';
import * as SplashScreenExpo from 'expo-splash-screen';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import VinylDisc from './src/components/VinylDisc';
import { useAlbums } from './src/data/useAlbums';

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const { albums, loading, error } = useAlbums();

  const [fontsLoaded] = useFonts({
    BarlowCondensed_400Regular,
    BarlowCondensed_700Bold,
    BarlowCondensed_900Black,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreenExpo.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const renderContent = () => {
    if (showSplash) {
      return <SplashScreen onEnter={() => setShowSplash(false)} />;
    }
    if (loading) {
      return (
        <View style={styles.centered}>
          <VinylDisc size={100} center="#F05A00" />
          <Text style={styles.loadingText}>Loading catalogue…</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Failed to load</Text>
          <Text style={styles.errorMsg}>{error.message}</Text>
        </View>
      );
    }
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            albums={albums}
            setScreen={setScreen}
            setSelectedItem={setSelectedItem}
          />
        );
      case 'details':
        return <DetailScreen item={selectedItem} setScreen={setScreen} />;
      case 'discover':
        return (
          <DiscoverScreen
            albums={albums}
            setScreen={setScreen}
            setSelectedItem={setSelectedItem}
          />
        );
      case 'player':
        return (
          <PlayerScreen
            setScreen={setScreen}
            currentItem={selectedItem}
            fallbackItem={albums[0]}
          />
        );
      case 'library':
        return (
          <LibraryScreen
            albums={albums}
            setScreen={setScreen}
            setSelectedItem={setSelectedItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container} onLayout={onLayout}>
        {renderContent()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#111111',
  },
  loadingText: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  errorTitle: {
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 22,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
  errorMsg: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
  },
});
