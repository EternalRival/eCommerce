import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import { INITIAL_STATE, updateDtoSchema } from '../model';

import type { StoreApi } from 'zustand';
import type { AuthStore, UpdateDto } from '../model';

export function createAuthStore(initialState = INITIAL_STATE): StoreApi<AuthStore> {
  return createStore<AuthStore>()(
    devtools((set) => ({
      ...initialState,
      update: (state: UpdateDto): void => void set((prevState) => ({ ...prevState, ...updateDtoSchema.parse(state) })),
      delete: (): void => void set(initialState),
    }))
  );
}
