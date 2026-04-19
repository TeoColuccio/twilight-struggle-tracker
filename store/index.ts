import { TSTType, TSTCode, PowerType } from '@tdataroot/tst-domain';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type { TSTType, PowerType };

export type StabilityDisplay = 'dots' | 'number';

export type AppStore = {
  data: TSTType;
  showSEAsiaScore: boolean;
  shuttleDiplomacy: boolean;
  language: string | null;
  stabilityDisplay: StabilityDisplay;
  setInfluence: (countryName: string, side: PowerType, value: number) => void;
  clearInfluences: () => void;
  updateCurrentScore: (delta: number) => void;
  toggleBattleground: (countryName: string) => void;
  toggleSEAsiaScore: () => void;
  toggleShuttleDiplomacy: () => void;
  setLanguage: (lang: string) => void;
  setStabilityDisplay: (mode: StabilityDisplay) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      data: TSTCode.initData(),
      showSEAsiaScore: false,
      shuttleDiplomacy: false,
      language: null,
      stabilityDisplay: 'dots',

      setInfluence: (countryName, side, value) =>
        set((state) => ({ data: TSTCode.setInfluence(state.data, countryName, side, value) })),

      clearInfluences: () => set({ data: TSTCode.initData() }),

      updateCurrentScore: (delta) =>
        set((state) => ({ data: TSTCode.updateCurrentScore(state.data, delta) })),

      toggleBattleground: (countryName) =>
        set((state) => ({ data: TSTCode.toggleBattleground(state.data, countryName) })),

      toggleSEAsiaScore: () =>
        set((state) => ({ showSEAsiaScore: !state.showSEAsiaScore })),

      // TODO: chiamare la funzione del dominio per la Shuttle Diplomacy quando sarà implementata
      toggleShuttleDiplomacy: () =>
        set((state) => ({ shuttleDiplomacy: !state.shuttleDiplomacy })),

      setLanguage: (lang) => set({ language: lang }),

      setStabilityDisplay: (mode) => set({ stabilityDisplay: mode }),
    }),
    {
      name: 'appStore',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ data: state.data, showSEAsiaScore: state.showSEAsiaScore, roamingDiplomacy: state.shuttleDiplomacy, language: state.language, stabilityDisplay: state.stabilityDisplay }),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          import('i18next').then(({ default: i18n }) => i18n.changeLanguage(state.language!));
        }
      },
    }
  )
);