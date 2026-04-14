import React from 'react';
import { View, Image } from 'react-native';

export default function AlbumCover({ item, size = 140, radius = 20 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: '#2a2a2a',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {item.cover && (
        <Image
          source={{ uri: item.cover }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      )}
    </View>
  );
}
