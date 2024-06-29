import { createStore as createZustandStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { fetchTokenInfo } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';
import { STORAGE_PREFIX } from '~/shared/model/constants';

import { customerTokenSchema, guestTokenSchema } from './token-slice-state.schema';

import type { State, Store } from './user-store.type';

export function createStore(initialState: State): ReturnType<ReturnType<typeof createZustandStore<Store>>> {
  return createZustandStore<Store>()(
    devtools(
      persist(
        (set) => ({
          ...initialState,

          setGuestToken(token): void {
            set({ token: guestTokenSchema.parse({ ...token, type: 'guest' }) });
          },

          setCustomerToken(token): void {
            set({ token: customerTokenSchema.parse({ ...token, type: 'customer' }) });
          },
        }),

        {
          name: `${STORAGE_PREFIX}auth/token`,
          onRehydrateStorage() {
            return (store): void => {
              if (store?.token.type === 'empty') {
                fetchTokenInfo()
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
  );
}
