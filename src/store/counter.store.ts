import { createStore } from 'zustand';

import type { StoreApi } from 'zustand';

export type CounterState = { count: number };
export type CounterActions = { dec: () => void; inc: () => void };
export type CounterStore = CounterState & CounterActions;
export const defaultInitState: CounterState = { count: 0 };
export const createCounterStore = (initState: CounterState = defaultInitState): StoreApi<CounterStore> =>
  createStore<CounterStore>()((set) => ({
    ...initState,
    dec: (): void => void set((state) => ({ count: state.count - 1 })),
    inc: (): void => void set((state) => ({ count: state.count + 1 })),
  }));
