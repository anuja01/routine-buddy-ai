import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getActionsForRoutine, getRoutineById } from '@/mocks/mockData';
import { useProgressStore } from '@/store/useProgressStore';
import BennyFox from '@/features/benny/BennyFox';
import { Action } from '@/types/action';

export default function RoutineScreen() {
  const { routineId } = useLocalSearchParams<{ routineId: string }>();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const routine = useMemo(() => getRoutineById(routineId ?? ''), [routineId]);
  const actions = useMemo(() => getActionsForRoutine(routineId ?? ''), [routineId]);

  const { completedActions, resetRoutine } = useProgressStore();

  useEffect(() => {
    if (actions.length > 0) {
      resetRoutine(routineId ?? '', actions.map((a) => a.id));
    }
  }, [routineId]);

  const completedCount = actions.filter((a) => completedActions[a.id]).length;
  const progressPercent = actions.length > 0 ? (completedCount / actions.length) * 100 : 0;
  const allDone = completedCount === actions.length;

  const handleActionPress = (action: Action) => {
    if (completedActions[action.id]) return;
    router.push({ pathname: '/task', params: { actionId: action.id } });
  };

  if (!routine) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, isLandscape && styles.containerLandscape]}>
        {/* Left/Top: Benny + greeting */}
        <View style={[styles.bennySection, isLandscape && styles.bennySectionLandscape]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <BennyFox animation={allDone ? 'celebrate' : 'idle'} size={isLandscape ? 160 : 140} />

          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {allDone
                ? "You did it! 🎉 Amazing job!"
                : `Let's do our ${routine.name.toLowerCase()} together!`}
            </Text>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>
              {completedCount} of {actions.length} done
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        </View>

        {/* Right/Bottom: Action list */}
        <ScrollView
          style={[styles.actionList, isLandscape && styles.actionListLandscape]}
          contentContainerStyle={styles.actionListContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.listTitle}>{routine.icon} {routine.name}</Text>
          {actions.map((action) => {
            const done = !!completedActions[action.id];
            return (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, done && styles.actionCardDone]}
                onPress={() => handleActionPress(action)}
                activeOpacity={done ? 1 : 0.8}
                disabled={done}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={[styles.actionName, done && styles.actionNameDone]}>
                  {action.name}
                </Text>
                {done && <Text style={styles.checkmark}>✅</Text>}
              </TouchableOpacity>
            );
          })}

          {allDone && (
            <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()}>
              <Text style={styles.doneBtnText}>All done! Go Home 🏠</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
  bennySection: {
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  bennySectionLandscape: {
    width: '38%',
    paddingTop: 20,
    borderRightWidth: 2,
    borderRightColor: '#FFE4C4',
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  backText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    color: '#F47C30',
  },
  speechBubble: {
    backgroundColor: '#FFF0D0',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 8,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#F4A261',
  },
  speechText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    color: '#2C1500',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  progressLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
    textAlign: 'center',
  },
  progressTrack: {
    height: 16,
    backgroundColor: '#FFE4C4',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#06D6A0',
    borderRadius: 8,
  },
  actionList: {
    flex: 1,
  },
  actionListLandscape: {
    flex: 1,
  },
  actionListContent: {
    padding: 16,
    gap: 12,
  },
  listTitle: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 26,
    color: '#2C1500',
    marginBottom: 4,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    minHeight: 72,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    gap: 14,
  },
  actionCardDone: {
    backgroundColor: '#E8F8F0',
    opacity: 0.75,
  },
  actionIcon: {
    fontSize: 36,
  },
  actionName: {
    flex: 1,
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#2C1500',
  },
  actionNameDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkmark: {
    fontSize: 28,
  },
  doneBtn: {
    backgroundColor: '#06D6A0',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 8,
    minHeight: 72,
    justifyContent: 'center',
  },
  doneBtnText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 22,
    color: '#fff',
  },
});
