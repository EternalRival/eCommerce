import { createContext } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createZustandStore } from '~/shared/lib/zustand';

import type { StoreApi } from 'zustand';

const stateSchema = z.object({});

type State = z.infer<typeof stateSchema>;

type Actions = {
  reset: () => void;
  setFilters: (state: State) => void;
};

type Store = State & Actions;

const EMPTY_STATE: State = {};

export const [ProductListFiltersStoreProvider, useProductListFilters] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory() {
    return createStore<Store>()(
      devtools((set) => ({
        ...EMPTY_STATE,
        reset: (): void => void set(EMPTY_STATE),
        setFilters: (state): void => void set(stateSchema.parse(state)),
      }))
    );
  },
});
