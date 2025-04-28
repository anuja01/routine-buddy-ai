import { Task } from './task';

export interface Routine {
    id: string;
    title: string;
    description?: string;
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
  }