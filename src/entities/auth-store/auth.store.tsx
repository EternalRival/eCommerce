import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { mutateGetTokenInfo } from '~/shared/api/commercetools';
import { wrapStorageKey } from '~/shared/lib/local-storage';
import { toastifyError } from '~/shared/lib/react-toastify';

import { customerTokenSchema, guestTokenSchema } from './auth-state.schema';

import type { AuthState } from './auth-state.schema';
import type { ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { FCPropsWC } from '~/shared/model/types';

type State = AuthState;

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

const context = createContext<Nullable<StoreApi<Store>>>(null);

export function AuthStoreProvider({ children }: FCPropsWC): ReactNode {
  const storeRef = useRef(
    createStore<Store>()(
      devtools(
        persist(
          (set) => ({
            ...EMPTY_STATE,

            setGuestToken(state): void {
              set(guestTokenSchema.parse({ ...state, type: 'guest' }));
            },

            setCustomerToken(state): void {
              set(customerTokenSchema.parse({ ...state, type: 'customer' }));
            },
          }),

          {
            name: wrapStorageKey('auth/token'),
            onRehydrateStorage() {
              return (store): void => {
                if (store?.type === 'empty') {
                  mutateGetTokenInfo()
                    .then((tokenInfo) => {
                      store.setGuestToken(tokenInfo);
                    })
                    .catch(toastifyError);
                }
              };
            },
          }
        )
      )
    )
  );

  return <context.Provider value={storeRef.current}>{children}</context.Provider>;
}

export function useAuthStore<T>(selector: (store: Store) => T): T {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('useStore must be use within Provider');
  }

  return useStore(ctx, selector);
}

export type AuthStateByType<T extends State['type']> = Extract<State, { type: T }>;
