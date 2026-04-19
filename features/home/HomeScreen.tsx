import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { mockRoutines } from '@/mocks/mockData';
import { Routine } from '@/types/routine';
import BennyFox from '@/features/benny/BennyFox';

const CARD_COLORS = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#F4A261', '#A8DADC'];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLandscape = width > 600;

  const handleRoutinePress = (routine: Routine) => {
    router.push({ pathname: '/routine', params: { routineId: routine.id } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, isLandscape && styles.headerLandscape]}>
          <BennyFox animation="idle" size={isLandscape ? 140 : 160} />
          <View style={styles.greeting}>
            <Text style={styles.greetingHi}>Hi there! 👋</Text>
            <Text style={styles.greetingText}>I'm Benny!</Text>
            <Text style={styles.greetingSubtext}>
              Which routine are{'\n'}we doing today?
            </Text>
          </View>
        </View>

        {/* Routine cards */}
        <View style={[styles.grid, isLandscape && styles.gridLandscape]}>
          {mockRoutines.map((routine, index) => (
            <TouchableOpacity
              key={routine.id}
              style={[
                styles.card,
                { backgroundColor: CARD_COLORS[index % CARD_COLORS.length] },
                isLandscape && styles.cardLandscape,
              ]}
              onPress={() => handleRoutinePress(routine)}
              activeOpacity={0.82}
            >
              <Text style={styles.cardIcon}>{routine.icon}</Text>
              <Text style={styles.cardName}>{routine.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 12,
    gap: 8,
  },
  headerLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    paddingVertical: 16,
  },
  greeting: {
    alignItems: 'center',
  },
  greetingHi: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    color: '#F47C30',
  },
  greetingText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 40,
    color: '#2C1500',
    lineHeight: 48,
  },
  greetingSubtext: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    lineHeight: 28,
  },
  grid: {
    flexDirection: 'column',
    gap: 16,
    marginTop: 12,
  },
  gridLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
  },
  card: {
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardLandscape: {
    width: '44%',
    minHeight: 110,
  },
  cardIcon: {
    fontSize: 52,
    marginBottom: 8,
  },
  cardName: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 24,
    color: '#2C1500',
    textAlign: 'center',
  },
});
