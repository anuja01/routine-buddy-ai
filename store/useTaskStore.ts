import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { Task } from '@/types/task';

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  toggleTaskCompleted: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set(() => ({ tasks })),
      toggleTaskCompleted: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        })),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => mmkvStorage.getString(key) ?? null,
        setItem: (key, value) => mmkvStorage.set(key, value),
        removeItem: (key) => mmkvStorage.delete(key),
      })),
    }
  )
);
