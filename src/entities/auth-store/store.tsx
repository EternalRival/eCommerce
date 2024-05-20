import { createContext, useEffect } from 'react';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getTokenInfo } from '~/shared/api/commercetools';
import { wrapStorageKey } from '~/shared/lib/local-storage';
import { toastifyError } from '~/shared/lib/react-toastify';
import { createZustandStore } from '~/shared/lib/zustand';

import type { ComponentProps, ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { FCPropsWC } from '~/shared/model/types';

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
  init: () => Promise<void>;
  reset: () => Promise<void>;
  setGuestToken: (state: Pick<State, 'access_token'>) => void;
  setCustomerToken: (state: Pick<State, 'access_token' | 'refresh_token'>) => void;
};

type Store = State & Actions;

const EMPTY_STATE: State = {
  type: 'empty',
  access_token: null,
  refresh_token: null,
};

const [StoreProvider, useStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()(
      devtools(
        persist(
          (set, get) => ({
            ...EMPTY_STATE,
            async init(): Promise<void> {
              if (get().type === 'empty') {
                get().setGuestToken(await getTokenInfo());
              }
            },
            async reset(): Promise<void> {
              set(EMPTY_STATE);
              await get().init();
            },
            setGuestToken: (state): void => void set(guestTokenSchema.parse({ ...state, type: 'guest' })),
            setCustomerToken: (state): void => void set(customerTokenSchema.parse({ ...state, type: 'customer' })),
          }),
          { name: wrapStorageKey('auth/token') }
        )
      )
    ),
});

function AuthStoreInit(): ReactNode {
  const { init } = useStore((store) => store);

  useEffect(() => {
    init().catch(toastifyError);
  }, [init]);

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

export type AuthStateByType<T extends State['type']> = Extract<State, { type: T }>;
