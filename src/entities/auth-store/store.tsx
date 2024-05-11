import { createContext, useEffect } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { wrapStorageKey } from '~/shared/lib/local-storage';
import { createZustandStore } from '~/shared/lib/zustand';

import type { ComponentProps, ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { FCPropsWC } from '~/shared/model/types';

const anonTokenSchema = z
  .object({
    access_token: z.string(),
  })
  .strip()
  .nullable();

const customerTokenSchema = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
  })
  .strip()
  .nullable();

const stateSchema = z.object({
  anonToken: anonTokenSchema,
  customerToken: customerTokenSchema,
});

type AnonToken = z.infer<typeof anonTokenSchema>;

type CustomerToken = z.infer<typeof customerTokenSchema>;

type State = z.infer<typeof stateSchema>;

type Actions = {
  updateAnonToken: (state: AnonToken) => void;
  resetAnonToken: () => void;
  updateCustomerToken: (state: CustomerToken) => void;
  resetCustomerToken: () => void;
};

type Store = State & Actions;

const EMPTY_STATE: State = {
  anonToken: null,
  customerToken: null,
};

const [StoreProvider, useStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()(
      devtools(
        persist(
          (set) => ({
            ...EMPTY_STATE,
            updateAnonToken: (state): void => void set({ anonToken: anonTokenSchema.parse(state) }),
            resetAnonToken: (): void => void set({ anonToken: null }),
            updateCustomerToken: (state): void => void set({ customerToken: customerTokenSchema.parse(state) }),
            resetCustomerToken: (): void => void set({ customerToken: null }),
          }),
          { name: wrapStorageKey('auth/token') }
        )
      )
    ),
});

function AuthStoreInit(): ReactNode {
  const { updateAnonToken, updateCustomerToken } = useStore((store) => store);
  /*   const { data } = useQuery({ queryKey: ['anon-token'], queryFn: getTokenInfo });
  const a = useMemo(() => data, []);
  toast(a); */

  useEffect(() => {
    updateAnonToken({ access_token: 'wo1o' });
    updateCustomerToken({ access_token: 'not w1oo', refresh_token: ' def not 1woo' });
  }, [updateAnonToken, updateCustomerToken]);

  return null;
}

export function AuthStoreProvider({ children, ...props }: FCPropsWC<ComponentProps<typeof StoreProvider>>): ReactNode {
  return (
    <StoreProvider {...props}>
      <AuthStoreInit />
      {children}
    </StoreProvider>
  );
}

export const useAuthStore = useStore;
