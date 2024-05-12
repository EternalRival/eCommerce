import { createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getTokenInfo } from '~/shared/api/commercetools';
import { wrapStorageKey } from '~/shared/lib/local-storage';
import { createZustandStore } from '~/shared/lib/zustand';

import type { ComponentProps, ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { FCPropsWC } from '~/shared/model/types';

const stateSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('empty') }),
  z.object({ type: z.literal('anonymous'), access_token: z.string() }).strip(),
  z.object({ type: z.literal('customer'), access_token: z.string(), refresh_token: z.string() }),
]);

type State = z.infer<typeof stateSchema>;

type Actions = {
  init: () => Promise<void>;
  update: (state: State) => void;
  reset: () => void;
};

type Store = State & Actions;

export type AuthStateByType<T extends State['type']> = Extract<State, { type: T }>;

const EMPTY_STATE: State = {
  type: 'empty',
};

const [StoreProvider, useStore] = createZustandStore({
  context: createContext<Nullable<StoreApi<Store>>>(null),
  createStoreFactory: () =>
    createStore<Store>()(
      devtools(
        persist(
          (set, get) => ({
            ...EMPTY_STATE,
            init: async (): Promise<void> => {
              if (get().type === 'empty') {
                get().update({ type: 'anonymous', ...(await getTokenInfo()) });
              }
            },
            update: (state): void => void set(stateSchema.parse(state)),
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
    init().catch((reason: unknown) => {
      if (reason instanceof Error) {
        toast.error(reason.message);
      }
    });
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
