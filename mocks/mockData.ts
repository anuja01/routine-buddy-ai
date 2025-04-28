// mock/mockData.ts
import { Routine } from '@/types/routine';

export const mockRoutines: Routine[] = [
  {
    id: 'routine-1',
    title: 'Morning Routine',
    description: 'Start your day right!',
    tasks: [
      { id: 'task-1', name: 'Brush Teeth', isCompleted: false },
      { id: 'task-2', name: 'Get Dressed', isCompleted: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'routine-2',
    title: 'Evening Routine',
    description: 'Prepare for sleep',
    tasks: [
      { id: 'task-3', name: 'Shower', isCompleted: false },
      { id: 'task-4', name: 'Read Book', isCompleted: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
