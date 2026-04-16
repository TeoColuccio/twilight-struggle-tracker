import { TSTType, TSTCode, PowerType } from '@fzt/tst-domain';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type { TSTType, PowerType };

export type AppStore = {
  data: TSTType;
  setInfluence: (countryName: string, side: PowerType, value: number) => void;
  clearInfluences: () => void;
  updateCurrentScore: (delta: number) => void;
  toggleBattleground: (countryName: string) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      data: TSTCode.initData(),

      setInfluence: (countryName, side, value) =>
        set((state) => ({ data: TSTCode.setInfluence(state.data, countryName, side, value) })),

      clearInfluences: () => set({ data: TSTCode.initData() }),

      updateCurrentScore: (delta) =>
        set((state) => ({ data: TSTCode.updateCurrentScore(state.data, delta) })),

      toggleBattleground: (countryName) =>
        set((state) => ({ data: TSTCode.toggleBattleground(state.data, countryName) })),
    }),
    {
      name: 'appStore',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ data: state.data }),
    }
  )
);