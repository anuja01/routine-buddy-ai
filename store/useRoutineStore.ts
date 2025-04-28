// store/useRoutineStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { Routine } from '@/types/routine';

interface RoutineState {
  routines: Routine[];
  setRoutines: (routines: Routine[]) => void;
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set) => ({
      routines: [],
      setRoutines: (routines) => set(() => ({ routines })),
    }),
    {
      name: 'routine-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => mmkvStorage.getString(key) ?? null,
        setItem: (key, value) => mmkvStorage.set(key, value),
        removeItem: (key) => mmkvStorage.delete(key),
      })),
    }
  )
);
