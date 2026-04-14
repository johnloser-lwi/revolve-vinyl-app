import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import VinylDisc from '../components/VinylDisc';
import BottomNav from '../components/BottomNav';
import { S } from '../styles';

export default function DetailScreen({ item, setScreen }) {
  const [liked, setLiked] = useState(false);

  if (!item) return null;

  return (
    <View style={styles.container}>
      {/* Ambient glow top-right */}
      <View style={[styles.glow, { backgroundColor: item.color + '18' }]} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.px}>

          {/* ── Header ── */}
          <View style={styles.header}>
            <Pressable style={S.iconBtn} onPress={() => setScreen('home')}>
              <Feather name="arrow-left" size={17} color="#ece7e7" />
            </Pressable>
            <Text style={styles.headerTitle}>Vinyl Details</Text>
            <Pressable
              style={[
                S.iconBtn,
                liked && {
                  borderColor: 'rgba(240,90,0,0.4)',
                  backgroundColor: 'rgba(240,90,0,0.05)',
                },
              ]}
              onPress={() => setLiked((v) => !v)}
            >
              {liked ? (
                <Ionicons name="heart" size={17} color="#F05A00" />
              ) : (
                <Feather name="heart" size={17} color="#ece7e7" />
              )}
            </Pressable>
          </View>

          {/* ── Album hero card ── */}
          <View style={styles.heroCard}>
            {/* Album art */}
            <View style={styles.heroArt}>
              {item.cover && (
                <Image
                  source={{ uri: item.cover }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              )}
            </View>
            {/* Vinyl peeking right */}
            <View style={styles.heroVinyl}>
              <VinylDisc size={240} center={item.color} cover={item.cover} />
            </View>
            {/* Info overlay */}
            <View style={styles.heroInfo}>
              <Text style={styles.heroArtist}>{item.artist}</Text>
              <Text style={styles.heroTitle}>{item.title}</Text>
              <Text style={styles.heroEdition}>Premium pressing / deluxe edition</Text>
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </View>
          </View>

          {/* ── Genre tags ── */}
          <View style={styles.tagRow}>
            {item.genre.map((tag) => (
              <View key={tag} style={S.tag}>
                <Text style={S.tagText}>{tag}</Text>
              </View>
            ))}
            <View style={S.tag}>
              <Text style={S.tagText}>VINYL</Text>
            </View>
          </View>

          {/* ── Tracklist ── */}
          <Text style={styles.tracklistHeading}>Tracklist</Text>
          <View style={styles.tracklistBox}>
            {(item.tracks ?? []).map((track, index) => (
              <View
                key={track.number}
                style={[
                  styles.trackRow,
                  index !== item.tracks.length - 1 && styles.trackRowBorder,
                ]}
              >
                <View style={styles.trackLeft}>
                  <Text style={styles.trackNum}>{track.number}</Text>
                  <Text style={styles.trackName}>{track.name}</Text>
                </View>
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </View>
            ))}
          </View>

          {/* ── Actions ── */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                S.orangeBtn,
                styles.actionBtn,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Feather name="shopping-bag" size={16} color="#000" />
              <Text style={S.orangeBtnText}>Purchase</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.reviewBtn, { opacity: pressed ? 0.85 : 1 }]}
              onPress={() => setScreen('player')}
            >
              <Feather name="play" size={16} color="#ece7e7" />
              <Text style={styles.reviewBtnText}>Review</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>

      <BottomNav active="home" setScreen={setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  scroll: { flex: 1 },
  px: { paddingHorizontal: 20, paddingTop: 20 },
  glow: {
    position: 'absolute',
    top: 0,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    pointerEvents: 'none',
  },

  header: {
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

  heroCard: {
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#171717',
    padding: 20,
    overflow: 'hidden',
    height: 310,
  },
  heroArt: {
    position: 'absolute',
    left: 20,
    top: 52,
    width: 180,
    height: 180,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  heroVinyl: {
    position: 'absolute',
    right: -16,
    top: 16,
  },
  heroInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  heroArtist: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  heroTitle: {
    marginTop: 4,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 36,
    textTransform: 'uppercase',
    lineHeight: 34,
    color: '#ece7e7',
  },
  heroEdition: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  pricePill: {
    marginTop: 10,
    alignSelf: 'flex-start',
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

  tagRow: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tracklistHeading: {
    marginTop: 20,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 22,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
  tracklistBox: {
    marginTop: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#151515',
    overflow: 'hidden',
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  trackRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  trackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  trackNum: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    width: 20,
    fontFamily: 'BarlowCondensed_400Regular',
  },
  trackName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ece7e7',
  },
  trackDuration: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    height: 52,
  },
  reviewBtn: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  reviewBtnText: {
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 13,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
});
