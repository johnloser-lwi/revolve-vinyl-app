import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import VinylDisc from '../components/VinylDisc';
import BottomNav from '../components/BottomNav';
import { S } from '../styles';

export default function HomeScreen({ albums, setScreen, setSelectedItem }) {
  const featured = albums.filter((a) => a.featured);

  function openDetails(item) {
    setSelectedItem(item);
    setScreen('details');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.px}>
          <Image
            source={require('../../assets/main-logo.png')}
            style={{ height: 28, width: 120 }}
            resizeMode="contain"
          />
        </View>

        {/* ── Hero banner ── */}
        <View style={[styles.px, { marginTop: 20 }]}>
          <View style={styles.heroBanner}>
            <View style={styles.heroGlow} />
            <Text style={styles.featuredLabel}>Featured Drop</Text>
            <Text style={styles.heroTitle}>Spin what{'\n'}matters.</Text>
            <Text style={styles.heroSub}>
              Collect limited pressings and discover new releases.
            </Text>
            <View style={styles.heroBottom}>
              <Pressable
                style={({ pressed }) => [S.orangeBtn, { opacity: pressed ? 0.85 : 1 }]}
                onPress={() => albums[0] && openDetails(albums[0])}
              >
                <Text style={S.orangeBtnText}>Purchase</Text>
              </Pressable>
              <View>
                <VinylDisc size={160} center="#F05A00" />
                <View style={styles.heroAlbumArt}>
                  {albums[0]?.cover && (
                    <Image
                      source={{ uri: albums[0].cover }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ── Section header ── */}
        <View style={[styles.px, styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>Featured Drops</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        {/* ── Horizontal featured scroll ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featScroll}
          style={{ marginTop: 14 }}
        >
          {featured.map((item, idx) => (
            <Pressable
              key={item.id}
              onPress={() => openDetails(item)}
              style={({ pressed }) => [styles.featCard, { opacity: pressed ? 0.9 : 1 }]}
            >
              <View style={styles.featCardInner}>
                <Text style={styles.featCardNum}>0{idx + 1}</Text>
                <Pressable style={[S.iconBtn, styles.featHeart]}>
                  <Feather name="heart" size={14} color="#ece7e7" />
                </Pressable>
                {/* Spinning vinyl peeking from the right */}
                <View style={styles.featVinyl}>
                  <VinylDisc size={140} center={item.color} cover={item.cover} />
                </View>
                {/* Album art thumbnail */}
                <View style={styles.featCover}>
                  {item.cover && (
                    <Image
                      source={{ uri: item.cover }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  )}
                </View>
                {/* Bottom info */}
                <View style={styles.featBottom}>
                  <Text style={styles.featArtist}>{item.artist}</Text>
                  <Text style={styles.featTitle}>{item.title}</Text>
                  <View style={styles.featPriceRow}>
                    <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                      Limited pressing
                    </Text>
                    <Text style={{ fontWeight: '700', color: '#ece7e7', fontSize: 12 }}>
                      {item.price}
                    </Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [
                      S.orangeBtn,
                      { marginTop: 12, opacity: pressed ? 0.85 : 1 },
                    ]}
                    onPress={() => openDetails(item)}
                  >
                    <Text style={S.orangeBtnText}>Purchase</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Daily Pick ── */}
        <View style={[styles.px, { marginTop: 20, paddingBottom: 16 }]}>
          <View style={styles.dailyPick}>
            <View>
              <Text style={styles.dailyLabel}>Daily Pick</Text>
              <Text style={styles.dailyTitle}>Jazz Essentials</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                S.orangeBtn,
                { backgroundColor: '#fff', opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Feather name="plus" size={14} color="#000" />
              <Text style={[S.orangeBtnText, { color: '#000' }]}>Add</Text>
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
  scroll: { flex: 1, paddingTop: 20 },
  px: { paddingHorizontal: 20 },

  heroBanner: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#181818',
    padding: 20,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(240,90,0,0.12)',
  },
  featuredLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  heroTitle: {
    marginTop: 8,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 38,
    lineHeight: 36,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
  heroSub: {
    marginTop: 10,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    maxWidth: 170,
  },
  heroBottom: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroAlbumArt: {
    position: 'absolute',
    left: -28,
    top: 28,
    width: 100,
    height: 100,
    borderRadius: 18,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },

  sectionHeader: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 22,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
  seeAll: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },

  featScroll: { paddingHorizontal: 20, gap: 14, paddingBottom: 8 },
  featCard: { minWidth: 220 },
  featCardInner: {
    borderRadius: 26,
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    padding: 16,
    height: 310,
  },
  featCardNum: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
    letterSpacing: 2,
  },
  featHeart: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  featVinyl: {
    position: 'absolute',
    right: -18,
    top: 50,
  },
  featCover: {
    position: 'absolute',
    left: 16,
    top: 78,
    width: 128,
    height: 128,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  featBottom: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    right: 16,
  },
  featArtist: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  featTitle: {
    marginTop: 4,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 22,
    textTransform: 'uppercase',
    lineHeight: 21,
    color: '#ece7e7',
  },
  featPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  dailyPick: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#151515',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dailyLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2.8,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  dailyTitle: {
    marginTop: 4,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
});
