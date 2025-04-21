import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Audio } from 'expo-av';

const SIZE = 100;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Props = {
  duration: number;
  color?: string;
};

export const CircularCountdownTimer = ({ duration, color = '#D16E5B' }: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const hasCompleted = useRef(false); // Track sound trigger

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CIRCUMFERENCE],
  });

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/audio/timer-bell-sound.mp3')
      );
      await sound.playAsync();
    } catch (err) {
      console.warn('Failed to play sound:', err);
    }
  };

  const triggerCompleteAnimation = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.3,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startAnimation = () => {
    // Reset state
    hasCompleted.current = false;
    animatedValue.setValue(0);

    animationRef.current?.stop(); // Cancel any ongoing animation

    animationRef.current = Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration * 1000,
      useNativeDriver: false,
    });

    animationRef.current.start(({ finished }) => {
      if (finished && !hasCompleted.current) {
        hasCompleted.current = true;
        triggerCompleteAnimation();
        playSound();
      }
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const handlePress = () => {
    startAnimation();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            stroke="#eee"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          <AnimatedCircle
            stroke={color}
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        </Svg>
      </Animated.View>
    </TouchableOpacity>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
