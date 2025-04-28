import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Animated, useWindowDimensions } from 'react-native';
import { useAppTheme } from '@/theme/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';

import { ThemedButton } from '@/components/ThemedButton';
import { CloseButton } from '@/components/CloseButton';

const backgroundImage = require('@/assets/images/routine.morning.background.png');
const buddyImage = require('@/assets/images/morning-routine-nicko.png');
const arrowIcon = require('@/assets/images/left-arrow.png');
const doneIcon = require('@/assets/images/done-tick.png');
const crossIcon = require('@/assets/images/warning-cross.png');

const RoutineScreen = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const sound = useRef<Audio.Sound | null>(null);
  const { width, height } = useWindowDimensions();
  const isHorizontal = width > height;
  const isLargeScreen = Math.min(width, height) >= 768;
  const router = useRouter();

  const arrowNudge = useRef(new Animated.Value(0)).current;
  const { routineId, userName, steps } = useLocalSearchParams<{
    routineId: string;
    userName: string;
    steps: string;
  }>();

  const parsedSteps = steps ? JSON.parse(steps) : [];

  useEffect(() => {
    startNudge();
    playSequence();
    return () => {
      sound.current?.unloadAsync();
    };
  }, []);

  const startNudge = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowNudge, {
          toValue: 6,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(arrowNudge, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const audioClips = [
    require('@/assets/audio/good-morning.mp3'),
    require('@/assets/audio/lets-do-this-together.mp3'),
  ];

  const delayBetweenClips = 100;

  const playSequence = async () => {
    for (let i = 0; i < audioClips.length; i++) {
      const { sound: loadedSound } = await Audio.Sound.createAsync(audioClips[i]);
      sound.current = loadedSound;
      await loadedSound.playAsync();
      await waitForPlaybackToFinish(loadedSound);
      await loadedSound.unloadAsync();
      if (i < audioClips.length - 1) {
        await delay(delayBetweenClips);
      }
    }
  };

  const waitForPlaybackToFinish = (sound: Audio.Sound) => {
    return new Promise<void>((resolve) => {
      const checkStatus = async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && !status.isPlaying) {
          resolve();
        } else {
          setTimeout(checkStatus, 200);
        }
      };
      checkStatus();
    });
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.headerContainer}>
        <CloseButton />
        <Text style={styles.subtitle}>Let's do it {userName}!</Text>
      </View>
      <View style={[styles.contentContainer, isHorizontal ? styles.horizontalLayout : styles.verticalLayout]}>
        <View style={styles.listContainer}>
          {parsedSteps.map((btn: any, index: number) => (
            <View key={index} style={styles.row}>
              <ThemedButton
                fullWidth
                title={btn.title}
                icon={btn.icon}
                onPress={() => router.push('/task')}
                disabled={btn.disabled}
              />
              {btn.status === 'next' ? (
                <Animated.View style={{ transform: [{ translateX: arrowNudge }] }}>
                  <Image source={arrowIcon} style={isLargeScreen ? styles.largeIcon : styles.icon} resizeMode="contain" />
                </Animated.View>
              ) : btn.status === 'completed' ? (
                <Image source={doneIcon} style={isLargeScreen ? styles.largeIcon : styles.icon} resizeMode="contain" />
              ) : btn.status === 'skipped' ? (
                <Image source={crossIcon} style={isLargeScreen ? styles.largeIcon : styles.icon} resizeMode="contain" />
              ) : (
                <View style={isLargeScreen ? styles.largeIcon : styles.icon} />
              )}
            </View>
          ))}
        </View>
        <View style={[styles.buddyContainer, isHorizontal ? styles.buddyHorizontal : styles.buddyVertical]}>
          <Image source={buddyImage} style={isLargeScreen ? styles.buddyLarge : styles.buddySmall} resizeMode="contain" />
        </View>
        <View style={styles.finishButtonWrapper}>
          <ThemedButton type="secondary" title={'Finish'} />
        </View>
      </View>
    </ImageBackground>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
    },
    headerContainer: {
      flex: 1,
      maxHeight: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    subtitle: {
      fontSize: 18,
      color: colors.text,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
    },
    horizontalLayout: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    verticalLayout: {
      flexDirection: 'column-reverse',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    icon: {
      width: 40,
      height: 40,
      marginLeft: 12,
    },
    largeIcon: {
      width: 80,
      height: 80,
      marginLeft: 12,
    },
    buddyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buddyHorizontal: {
      flex: 1,
      marginTop: 80,
    },
    buddyVertical: {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
    },
    buddySmall: {
      width: 200,
      height: 200,
    },
    buddyLarge: {
      width: 400,
      height: 400,
    },
    finishButtonWrapper: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });

export default RoutineScreen;