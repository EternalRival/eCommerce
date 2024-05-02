import { createStore } from 'zustand';

import { INITIAL_STATE } from '../model';

import type { AuthStore, AuthToken } from '../model';
import type { StoreApi } from 'zustand';

export function createAuthStore(initialState = INITIAL_STATE): StoreApi<AuthStore> {
  return createStore<AuthStore>()((set) => ({
    ...initialState,
    update: (token: AuthToken): void => void set({ token }),
    delete: (): void => void set(initialState),
  }));
}
