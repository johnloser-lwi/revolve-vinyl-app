import React, { useEffect, useRef, useMemo } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

// Web version used CSS conic-gradient and mixBlendMode for the shimmer ring —
// neither is supported in React Native. The rings and center label are rebuilt
// with plain Views, giving the same structural look.
export default function VinylDisc({ size = 220, center = '#F05A00', rotating = true, cover = null }) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null);

  useEffect(() => {
    if (rotating) {
      spinValue.setValue(0);
      loopRef.current = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 9000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
    }
    return () => loopRef.current?.stop();
  }, [rotating]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rings = useMemo(() => Array.from({ length: 11 }, (_, i) => i), []);
  const ringStep = (size - 70) / 30;

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        flexShrink: 0,
        transform: [{ rotate }],
      }}
    >
      {/* Base disc */}
      <View
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          borderRadius: size / 2,
          backgroundColor: '#0d0d0d',
          overflow: 'hidden',
        }}
      >
        {cover && (
          <Image
            source={{ uri: cover }}
            style={{
              position: 'absolute',
              top: size * 0.1,
              left: size * 0.1,
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: size * 0.4,
              opacity: 0.35,
            }}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Grooves */}
      {rings.map((ring) => {
        const inset = Math.round(16 + ring * ringStep);
        return (
          <View
            key={ring}
            style={{
              position: 'absolute',
              top: inset,
              right: inset,
              bottom: inset,
              left: inset,
              borderRadius: (size - inset * 2) / 2,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.12)',
            }}
          />
        );
      })}

      {/* Center label */}
      <View
        style={{
          position: 'absolute',
          left: size / 2 - size * 0.11,
          top: size / 2 - size * 0.11,
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: size * 0.11,
          backgroundColor: center,
        }}
      />

      {/* Spindle hole */}
      <View
        style={{
          position: 'absolute',
          left: size / 2 - size * 0.025,
          top: size / 2 - size * 0.025,
          width: size * 0.05,
          height: size * 0.05,
          borderRadius: size * 0.025,
          backgroundColor: '#f0f0f0',
        }}
      />
    </Animated.View>
  );
}
