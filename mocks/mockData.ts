import { Routine } from '@/types/routine';
import { Action } from '@/types/action';

export const mockRoutines: Routine[] = [
  { id: 'morning', name: 'Morning Routine', icon: '☀️' },
  { id: 'bedtime', name: 'Bedtime Routine', icon: '🌙' },
  { id: 'school', name: 'School Routine', icon: '🎒' },
];

export const mockActions: Action[] = [
  {
    id: 'wake-up',
    routineId: 'morning',
    name: 'Wake Up',
    icon: '🌅',
    durationSeconds: 60,
    bennyAnimation: 'wakeUp',
    encouragements: [
      "Good morning, {name}! Time to rise and shine!",
      "Benny is stretching too, {name}! Reach those arms up high!",
      "A brand new day is waiting for you, {name}!",
      "You slept so well! Now let's get up and be awesome!",
      "Wakey wakey, {name}! Today is going to be amazing!",
    ],
  },
  {
    id: 'use-toilet',
    routineId: 'morning',
    name: 'Use Toilet',
    icon: '🚽',
    durationSeconds: 120,
    bennyAnimation: 'toilet',
    encouragements: [
      "Benny always uses the toilet first thing too, {name}!",
      "Taking care of your body is so important!",
      "You're doing great, {name} — this is a big kid thing to do!",
      "Almost done — you've got this!",
      "Benny gives you a big thumbs up for this one, {name}!",
    ],
  },
  {
    id: 'wash-face',
    routineId: 'morning',
    name: 'Wash Face',
    icon: '💧',
    durationSeconds: 60,
    bennyAnimation: 'washFace',
    encouragements: [
      "Cold water wakes up your face AND your brain, {name}!",
      "Benny is splashing water too — wheee!",
      "You'll feel so fresh and clean after this, {name}!",
      "Wash away the sleepies — good morning face!",
      "Benny says clean faces are the best faces!",
    ],
  },
  {
    id: 'brush-teeth',
    routineId: 'morning',
    name: 'Brush Teeth',
    icon: '🪥',
    durationSeconds: 120,
    bennyAnimation: 'brushTeeth',
    encouragements: [
      "Benny is brushing his teeth right alongside you, {name}!",
      "You'll have super sparkly teeth after this!",
      "Up and down, round and round — great brushing, {name}!",
      "Strong teeth need good brushing — you're a pro!",
      "Benny's favourite part is the minty taste at the end!",
    ],
  },
  {
    id: 'get-dressed',
    routineId: 'morning',
    name: 'Get Dressed',
    icon: '👕',
    durationSeconds: 180,
    bennyAnimation: 'getDressed',
    encouragements: [
      "Pick your favourite outfit and put it on, {name}!",
      "Benny loves getting dressed — what will you wear today, {name}?",
      "You're getting so good at this!",
      "Arms in, head through — you know what to do, {name}!",
      "Almost ready! You look amazing already!",
    ],
  },
  {
    id: 'eat-breakfast',
    routineId: 'morning',
    name: 'Eat Breakfast',
    icon: '🥣',
    durationSeconds: 600,
    bennyAnimation: 'eatBreakfast',
    encouragements: [
      "Breakfast gives you superpowers for the whole day, {name}!",
      "Benny is munching his breakfast too — yum yum!",
      "Every bite makes you stronger and smarter, {name}!",
      "Take your time and enjoy every mouthful!",
      "Benny says breakfast is the best meal of the day!",
    ],
  },
];

export function getActionsForRoutine(routineId: string): Action[] {
  return mockActions.filter((a) => a.routineId === routineId);
}

export function getActionById(id: string): Action | undefined {
  return mockActions.find((a) => a.id === id);
}

export function getRoutineById(id: string): Routine | undefined {
  return mockRoutines.find((r) => r.id === id);
}
