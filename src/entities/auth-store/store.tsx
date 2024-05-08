import { createContext } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';

import { createZustandStore } from '~/shared/lib/zustand';

import type { StoreApi } from 'zustand';

const stateSchema = z.object({
  access_token: z.string().nullable(),
  expires_in: z.number().nullable(),
  refresh_token: z.string().nullable(),
});

const updateDtoSchema = stateSchema.partial().strip();

type State = z.infer<typeof stateSchema>;

type UpdateDto = z.infer<typeof updateDtoSchema>;

type Actions = {
  update: (state: UpdateDto) => void;
  delete: () => void;
};

type Store = State & Actions;

const INITIAL_STATE: State = {
  access_token: null,
  expires_in: null,
  refresh_token: null,
};

export const [AuthStoreProvider, useAuthStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()((set) => ({
      ...INITIAL_STATE,
      update: (state): void => void set(() => updateDtoSchema.parse(state)),
      delete: (): void => void set(() => INITIAL_STATE),
    })),
});
