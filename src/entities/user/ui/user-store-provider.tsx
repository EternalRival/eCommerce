import { useRef } from 'react';

import { UserStoreContext, createStore } from '../model';

import type { JSX, PropsWithChildren } from 'react';
import type { State } from '../model';

type AuthStoreProviderProps = Readonly<PropsWithChildren>;

const EMPTY_STATE: State = {
  token: {
    type: 'empty',
    access_token: null,
    refresh_token: null,
  },
};

export function UserStoreProvider({ children }: AuthStoreProviderProps): JSX.Element {
  const storeRef = useRef(createStore(EMPTY_STATE));

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
}
