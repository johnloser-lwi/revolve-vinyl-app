import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Feather substitutes for the lucide icons used in the web version:
//   Home     → 'home'
//   Compass  → 'compass'
//   Disc3    → 'music'   (Feather has no disc icon)
//   Library  → 'book-open'
const items = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'discover', icon: 'compass', label: 'Discover' },
  { id: 'player', icon: 'music', label: 'Player' },
  { id: 'library', icon: 'book-open', label: 'Library' },
];

export default function BottomNav({ active, setScreen }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setScreen(item.id)}
              style={({ pressed }) => [styles.tabBtn, { opacity: pressed ? 0.7 : 1 }]}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Feather
                  name={item.icon}
                  size={18}
                  color={isActive ? '#F05A00' : 'rgba(255,255,255,0.4)'}
                />
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 8,
  },
  bar: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(21,21,21,0.95)',
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabBtn: {
    alignItems: 'center',
    gap: 3,
    width: 68,
    paddingVertical: 4,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(240,90,0,0.15)',
  },
  label: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontFamily: 'BarlowCondensed_700Bold',
    color: 'rgba(255,255,255,0.4)',
  },
  labelActive: {
    color: '#F05A00',
  },
});
