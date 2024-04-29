import { create } from 'zustand';

type Store = { value: number; inc: () => void; dec: () => void };

export const useVStore = create<Store>((set) => ({
  value: 0,
  inc: (): void => void set((s) => ({ value: s.value + 1 })),
  dec: (): void => void set((s) => ({ value: s.value - 1 })),
}));
