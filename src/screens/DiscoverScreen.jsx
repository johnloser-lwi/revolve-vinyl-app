import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions, StyleSheet } from 'react-native';
import VinylDisc from '../components/VinylDisc';
import AlbumCover from '../components/AlbumCover';
import BottomNav from '../components/BottomNav';
import { S } from '../styles';

const filters = ['ALL', 'HIP HOP', 'ROCK', 'JAZZ', 'ELECTRONIC', 'R&B'];
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Two columns with 20px padding each side and 14px gap between columns
const CARD_WIDTH = (SCREEN_WIDTH - 40 - 14) / 2;

export default function DiscoverScreen({ albums, setScreen, setSelectedItem }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered =
    activeFilter === 'ALL'
      ? albums
      : albums.filter((v) => v.genre.includes(activeFilter));

  function openDetails(item) {
    setSelectedItem(item);
    setScreen('details');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.px}>

          {/* ── Title ── */}
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Explore records by mood, era, and genre.</Text>

          {/* ── Filter pills ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
            style={{ marginTop: 16 }}
          >
            {filters.map((f) => {
              const active = activeFilter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setActiveFilter(f)}
                  style={({ pressed }) => [
                    styles.filterPill,
                    active ? styles.filterPillActive : styles.filterPillInactive,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={[styles.filterText, active && styles.filterTextActive]}>
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* ── 2-column grid ── */}
          <View style={styles.grid}>
            {filtered.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => openDetails(item)}
                style={({ pressed }) => [
                  styles.gridCard,
                  { width: CARD_WIDTH, opacity: pressed ? 0.88 : 1 },
                ]}
              >
                {/* Vinyl peeking top-right */}
                <View style={styles.gridVinyl}>
                  <VinylDisc size={100} center={item.color} cover={item.cover} />
                </View>
                <AlbumCover item={item} size={90} radius={16} />
                <Text style={styles.gridArtist}>{item.artist}</Text>
                <Text style={styles.gridTitle}>{item.title}</Text>
                <Text style={styles.gridPrice}>{item.price}</Text>
                <Pressable
                  style={({ pressed }) => [
                    S.orangeBtn,
                    { marginTop: 10, opacity: pressed ? 0.85 : 1 },
                  ]}
                  onPress={() => openDetails(item)}
                >
                  <Text style={[S.orangeBtnText, { fontSize: 11 }]}>Purchase</Text>
                </Pressable>
              </Pressable>
            ))}
          </View>

        </View>
      </ScrollView>

      <BottomNav active="discover" setScreen={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  scroll: { flex: 1 },
  px: { paddingHorizontal: 20, paddingTop: 20 },

  title: {
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 36,
    textTransform: 'uppercase',
    lineHeight: 34,
    color: '#ece7e7',
  },
  subtitle: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },

  filterScroll: { gap: 8, paddingBottom: 4 },
  filterPill: {
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  filterPillActive: {
    backgroundColor: '#F05A00',
  },
  filterPillInactive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  filterText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontFamily: 'BarlowCondensed_700Bold',
    color: 'rgba(255,255,255,0.6)',
  },
  filterTextActive: {
    color: '#000',
  },

  grid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    paddingBottom: 20,
  },
  gridCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#161616',
    padding: 12,
    overflow: 'hidden',
    minHeight: 244,
  },
  gridVinyl: {
    position: 'absolute',
    right: -22,
    top: 36,
  },
  gridArtist: {
    marginTop: 32,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  gridTitle: {
    marginTop: 3,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 17,
    textTransform: 'uppercase',
    lineHeight: 16,
    color: '#ece7e7',
  },
  gridPrice: {
    marginTop: 6,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
});
