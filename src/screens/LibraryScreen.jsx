import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import AlbumCover from '../components/AlbumCover';
import BottomNav from '../components/BottomNav';

export default function LibraryScreen({ albums, setScreen, setSelectedItem }) {
  const collection = albums.slice(2);

  function openDetails(item) {
    setSelectedItem(item);
    setScreen('details');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.px}>

          <Text style={styles.title}>Library</Text>
          <Text style={styles.subtitle}>Your collected pressings.</Text>

          <View style={styles.list}>
            {collection.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => openDetails(item)}
                style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}
              >
                <AlbumCover item={item} size={60} radius={12} />
                <View style={styles.rowInfo}>
                  <Text style={styles.rowArtist}>{item.artist}</Text>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <View style={styles.genreRow}>
                    {item.genre.map((g) => (
                      <Text key={g} style={styles.genreTag}>{g}</Text>
                    ))}
                  </View>
                </View>
                <Text style={styles.rowPrice}>{item.price}</Text>
              </Pressable>
            ))}
          </View>

        </View>
      </ScrollView>

      <BottomNav active="library" setScreen={setScreen} />
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
    color: '#ece7e7',
  },
  subtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
  },

  list: {
    marginTop: 20,
    gap: 12,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 20,
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 12,
    paddingHorizontal: 14,
  },
  rowInfo: {
    flex: 1,
  },
  rowArtist: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'BarlowCondensed_400Regular',
  },
  rowTitle: {
    marginTop: 2,
    fontFamily: 'BarlowCondensed_900Black',
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#ece7e7',
  },
  genreRow: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  genreTag: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    fontFamily: 'BarlowCondensed_400Regular',
    textTransform: 'uppercase',
  },
  rowPrice: {
    fontFamily: 'BarlowCondensed_700Bold',
    fontSize: 16,
    color: '#F05A00',
  },
});
