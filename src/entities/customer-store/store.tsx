import { createContext } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createZustandStore } from '~/shared/lib/zustand';
import { wrapStorageKey } from '~/shared/lib/local-storage';

import type { StoreApi } from 'zustand';

const stateSchema = z.object({
  id: z.string().nullable(),
  email: z.string().nullable(),
});

type State = z.infer<typeof stateSchema>;

type Actions = {
  setCustomer: (state: State) => void;
  reset: () => void;
};

type Store = State & Actions;

const EMPTY_STATE: State = {
  id: null,
  email: null,
};

export const [CustomerStoreProvider, useCustomerStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()(
      devtools(
        persist(
          (set) => ({
            ...EMPTY_STATE,
            setCustomer: (state): void => void set(stateSchema.parse(state)),
            reset: (): void => void set(EMPTY_STATE),
          }),
          { name: wrapStorageKey('customer') }
        )
      )
    ),
});
