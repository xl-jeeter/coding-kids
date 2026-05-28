"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProgressState = {
  completedCourses: string[];
  completeCourse: (stageId: string, courseId: string) => void;
  resetProgress: () => void;
  isCompleted: (stageId: string, courseId: string) => boolean;
  getStageProgress: (stageId: string, total: number) => number;
};

const keyFor = (stageId: string, courseId: string) => `${stageId}/${courseId}`;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedCourses: [],
      completeCourse: (stageId, courseId) => {
        const key = keyFor(stageId, courseId);
        set((state) => ({
          completedCourses: state.completedCourses.includes(key)
            ? state.completedCourses
            : [...state.completedCourses, key],
        }));
      },
      resetProgress: () => set({ completedCourses: [] }),
      isCompleted: (stageId, courseId) => get().completedCourses.includes(keyFor(stageId, courseId)),
      getStageProgress: (stageId, total) => {
        if (total === 0) return 0;
        const finished = get().completedCourses.filter((key) => key.startsWith(`${stageId}/`)).length;
        return Math.round((finished / total) * 100);
      },
    }),
    {
      name: "coding-kids-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ completedCourses: state.completedCourses }),
    },
  ),
);
