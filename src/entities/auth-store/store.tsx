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

const emptyTokenSchema = z
  .object({ type: z.literal('empty'), access_token: optionalNullSchema, refresh_token: optionalNullSchema })
  .strip();
const anonymousTokenSchema = z
  .object({ type: z.literal('anonymous'), access_token: z.string(), refresh_token: optionalNullSchema })
  .strip();
const customerTokenSchema = z
  .object({ type: z.literal('customer'), access_token: z.string(), refresh_token: z.string() })
  .strip();
const stateSchema = z.discriminatedUnion('type', [emptyTokenSchema, anonymousTokenSchema, customerTokenSchema]);

type State = z.infer<typeof stateSchema>;

type Actions = {
  init: () => Promise<void>;
  setAnonymousToken: (state: Pick<State, 'access_token'>) => void;
  setCustomerToken: (state: Pick<State, 'access_token' | 'refresh_token'>) => void;
  reset: () => void;
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
                get().setAnonymousToken(await getTokenInfo());
              }
            },
            setAnonymousToken: (state): void => void set(anonymousTokenSchema.parse({ ...state, type: 'anonymous' })),
            setCustomerToken: (state): void => void set(customerTokenSchema.parse({ ...state, type: 'customer' })),
            reset: (): void => void set(EMPTY_STATE),
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
