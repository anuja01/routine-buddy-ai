// mock/mockData.ts
import { Routine } from '@/types/routine';
import { router } from 'expo-router';

export const mockRoutines: Routine[] = [
  {
    id: 'routine-1',
    title: 'Morning Routine',
    description: 'Start your day right!',
    tasks: [
      {
        name: 'Brush my teeth',
        icon: 'brush-teeth.png',
        onPress: () => router.push('/task'),
        status: 'next',
      },
      {
        name: 'Wash my face',
        icon: 'wash-face.png',

      },
      {
        name: 'Get dressed',
        icon: 'get-dressed.png',

      },
      {
        name: 'Eat breakfast',
        icon: 'eat-breakfast.png',

        disabled: false,
      },
      {
        name: 'Go to preschool',
        icon: 'goto-preschool.png',
        status: 'queued',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
