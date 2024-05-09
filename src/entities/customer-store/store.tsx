import { createContext } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createZustandStore } from '~/shared/lib/zustand';

import type { StoreApi } from 'zustand';

const stateSchema = z.object({
  id: z.string().nullable(),
  email: z.string().nullable(),
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
  id: null,
  email: null,
};

export const [CustomerStoreProvider, useCustomerStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()(
      devtools((set) => ({
        ...INITIAL_STATE,
        update: (state): void => void set(() => updateDtoSchema.parse(state)),
        delete: (): void => void set(() => INITIAL_STATE),
      }))
    ),
});
