import { createContext } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { wrapStorageKey } from '~/shared/lib/local-storage';
import { createZustandStore } from '~/shared/lib/zustand';
import { mutateGetTokenInfo } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { StoreApi } from 'zustand';

const optionalNullSchema = z.null().optional().default(null);

const emptyTokenSchema = z.object({
  type: z.literal('empty'),
  access_token: optionalNullSchema,
  refresh_token: optionalNullSchema,
});
const guestTokenSchema = z.object({
  type: z.literal('guest'),
  access_token: z.string(),
  refresh_token: optionalNullSchema,
});
const customerTokenSchema = z.object({
  type: z.literal('customer'),
  access_token: z.string(),
  refresh_token: z.string(),
});
const stateSchema = z.discriminatedUnion('type', [emptyTokenSchema, guestTokenSchema, customerTokenSchema]);

type State = z.infer<typeof stateSchema>;

type Actions = {
  setGuestToken: (state: Pick<State, 'access_token'>) => void;
  setCustomerToken: (state: Pick<State, 'access_token' | 'refresh_token'>) => void;
};

type Store = State & Actions;

const EMPTY_STATE: State = {
  type: 'empty',
  access_token: null,
  refresh_token: null,
};

export const [AuthStoreProvider, useAuthStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory() {
    return createStore<Store>()(
      devtools(
        persist(
          (set) => ({
            ...EMPTY_STATE,
            setGuestToken: (state): void => void set(guestTokenSchema.parse({ ...state, type: 'guest' })),
            setCustomerToken: (state): void => void set(customerTokenSchema.parse({ ...state, type: 'customer' })),
          }),
          {
            name: wrapStorageKey('auth/token'),
            onRehydrateStorage:
              () =>
              (store): void => {
                if (store?.type === 'empty') {
                  mutateGetTokenInfo()
                    .then((tokenInfo) => void store.setGuestToken(tokenInfo))
                    .catch(toastifyError);
                }
              },
          }
        )
      )
    );
  },
});

export type AuthStateByType<T extends State['type']> = Extract<State, { type: T }>;
