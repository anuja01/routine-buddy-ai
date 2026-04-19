import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { getActionById } from '@/mocks/mockData';
import { useProgressStore } from '@/store/useProgressStore';
import { useBennyVoice } from '@/hooks/useBennyVoice';
import { withName, childName } from '@/utils/childName';
import BennyFox from '@/features/benny/BennyFox';

const ENCOURAGEMENT_INTERVAL = 15_000;

export default function TaskScreen() {
  const { actionId } = useLocalSearchParams<{ actionId: string }>();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const action = getActionById(actionId ?? '');
  const { markComplete } = useProgressStore();
  const { speak, stop } = useBennyVoice();

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Delay first prompt so the child can see the screen before hearing it
  useEffect(() => {
    if (!action) return;
    const t = setTimeout(() => speak(withName(action.encouragements[0])), 1500);
    return () => { clearTimeout(t); stop(); };
  }, [action?.id]);

  // Rotate encouragement message every 30 s
  useEffect(() => {
    if (!action) return;
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
      setPhraseIndex((i) => {
        const next = (i + 1) % action.encouragements.length;
        if (!doneRef.current) speak(withName(action.encouragements[next]));
        return next;
      });
    }, ENCOURAGEMENT_INTERVAL);
    return () => clearInterval(interval);
  }, [action]);

  const handleDone = useCallback(async () => {
    if (!action) return;
    doneRef.current = true;
    setDone(true);
    markComplete(action.id);
    await speak(`Amazing job ${childName}! You finished ${action.name}!`);
    router.back();
  }, [action]);

  if (!action) return null;

  const timerSize = Math.min(width, height) * (isLandscape ? 0.28 : 0.38);
  const strokeWidth = Math.round(timerSize * 0.1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, isLandscape && styles.containerLandscape]}>

        {/* ── LEFT / TOP: Benny ── */}
        <View style={[styles.bennyPane, isLandscape && styles.bennyPaneLandscape]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <BennyFox
            animation={done ? 'celebrate' : action.bennyAnimation}
            size={isLandscape ? Math.round(height * 0.65) : Math.round(width * 0.55)}
          />
        </View>

        {/* ── RIGHT / BOTTOM: timer + content ── */}
        <View style={[styles.contentPane, isLandscape && styles.contentPaneLandscape]}>

          {/* Action title */}
          <Text style={styles.actionTitle}>{action.icon}  {action.name}</Text>

          {/* Timer */}
          <View style={styles.timerRow}>
            <CountdownCircleTimer
              isPlaying={!done}
              duration={action.durationSeconds}
              size={timerSize}
              strokeWidth={strokeWidth}
              colors={['#06D6A0', '#FFD166', '#F47C30', '#EF476F']}
              colorsTime={[
                action.durationSeconds,
                Math.round(action.durationSeconds * 0.6),
                Math.round(action.durationSeconds * 0.3),
                0,
              ]}
              onComplete={() => {
                handleDone();
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => (
                <Text style={[styles.timerText, { fontSize: timerSize * 0.22 }]}>
                  {remainingTime >= 60
                    ? `${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}`
                    : `${remainingTime}s`}
                </Text>
              )}
            </CountdownCircleTimer>
          </View>

          {/* Encouragement */}
          <Animated.View style={[styles.encourageBubble, { opacity: fadeAnim }]}>
            <Text style={styles.encourageText}>
              {withName(action.encouragements[phraseIndex])}
            </Text>
          </Animated.View>

          {/* Done button */}
          <TouchableOpacity
            style={[styles.doneBtn, done && styles.doneBtnFinished]}
            onPress={handleDone}
            activeOpacity={0.85}
          >
            <Text style={styles.doneBtnText}>{done ? '🎉 Amazing!' : "I'm done!"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerLandscape: {
    flexDirection: 'row',
  },
  bennyPane: {
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  bennyPaneLandscape: {
    width: '40%',
    borderRightWidth: 2,
    borderRightColor: '#FFE4C4',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    color: '#F47C30',
  },
  contentPane: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  contentPaneLandscape: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  actionTitle: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 30,
    color: '#2C1500',
    textAlign: 'center',
  },
  timerRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontFamily: 'Baloo2-Bold',
    color: '#2C1500',
  },
  encourageBubble: {
    backgroundColor: '#FFF0D0',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#F4A261',
    maxWidth: 400,
  },
  encourageText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#2C1500',
    textAlign: 'center',
    lineHeight: 26,
  },
  doneBtn: {
    backgroundColor: '#EF476F',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 40,
    alignItems: 'center',
    minHeight: 72,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#EF476F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  doneBtnFinished: {
    backgroundColor: '#06D6A0',
  },
  doneBtnText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 26,
    color: '#fff',
  },
});
