import { create } from 'zustand';

interface ProgressState {
  // Map of actionId -> completed
  completedActions: Record<string, boolean>;
  markComplete: (actionId: string) => void;
  resetRoutine: (routineId: string, actionIds: string[]) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  completedActions: {},
  markComplete: (actionId) =>
    set((s) => ({ completedActions: { ...s.completedActions, [actionId]: true } })),
  resetRoutine: (_routineId, actionIds) =>
    set((s) => {
      const next = { ...s.completedActions };
      actionIds.forEach((id) => { next[id] = false; });
      return { completedActions: next };
    }),
}));
