import { createContext } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { countryCodeSchema, currencyCodeSchema, localeSchema } from '~/shared/api/commercetools';
import { wrapStorageKey } from '~/shared/lib/local-storage';
import { createZustandStore } from '~/shared/lib/zustand';

import type { StoreApi } from 'zustand';

const stateSchema = z.object({
  locale: localeSchema,
  country: countryCodeSchema,
  currency: currencyCodeSchema,
});

type State = z.infer<typeof stateSchema>;

type Actions = {
  setLocale: (state: Partial<State>) => void;
  reset: () => void;
};

type Store = State & Actions;

const EMPTY_STATE: State = {
  locale: 'en-US',
  country: 'US',
  currency: 'USD',
};

export const [LocaleStoreProvider, useLocaleStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()(
      devtools(
        persist(
          (set) => ({
            ...EMPTY_STATE,
            setLocale: (state): void => void set(stateSchema.parse(state)),
            reset: (): void => void set(EMPTY_STATE),
          }),
          { name: wrapStorageKey('locale') }
        )
      )
    ),
});
