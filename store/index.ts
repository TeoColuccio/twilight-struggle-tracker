import { TSTType } from "@fzt/tst-domain";
import { TSTCode } from "@fzt/tst-domain";

import { create } from "zustand";

export type AppState = {
    data: TSTType;
    commit: (next: TSTType) => void;
    updateCurrentScore: (delta: number) => void;
};

export type AppStore = AppState;

export const useAppStore = create<AppStore>()((set, get) => ({
    data: {
        currentScore: 5,
        regionsById: {},
    } as TSTType,

    commit: (next: TSTType) =>
        set((state: AppState) => ({
            data: next,
        })),

    updateCurrentScore: (delta: number) => {
        const { data, commit } = get();
        const next = TSTCode.updateCurrentScore(data, delta);
        commit(next);
    }
}));