import { TSTType, TSTCode, PowerType } from '@tdataroot/tst-domain';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type { TSTType, PowerType };

export type AppStore = {
  data: TSTType;
  showSEAsiaScore: boolean;
  language: string | null;
  setInfluence: (countryName: string, side: PowerType, value: number) => void;
  clearInfluences: () => void;
  updateCurrentScore: (delta: number) => void;
  toggleBattleground: (countryName: string) => void;
  toggleSEAsiaScore: () => void;
  setLanguage: (lang: string) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      data: TSTCode.initData(),
      showSEAsiaScore: false,
      language: null,

      setInfluence: (countryName, side, value) =>
        set((state) => ({ data: TSTCode.setInfluence(state.data, countryName, side, value) })),

      clearInfluences: () => set({ data: TSTCode.initData() }),

      updateCurrentScore: (delta) =>
        set((state) => ({ data: TSTCode.updateCurrentScore(state.data, delta) })),

      toggleBattleground: (countryName) =>
        set((state) => ({ data: TSTCode.toggleBattleground(state.data, countryName) })),

      toggleSEAsiaScore: () =>
        set((state) => ({ showSEAsiaScore: !state.showSEAsiaScore })),

      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'appStore',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ data: state.data, showSEAsiaScore: state.showSEAsiaScore, language: state.language }),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          import('i18next').then(({ default: i18n }) => i18n.changeLanguage(state.language!));
        }
      },
    }
  )
);