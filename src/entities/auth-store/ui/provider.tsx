import { useRef } from 'react';

import { createAuthStore } from '../lib';
import { AuthStoreContext, INITIAL_STATE } from '../model';

import type { ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { FCPropsWC } from '~/shared/model/types';
import type { AuthStore } from '../model';

export function AuthStoreProvider({ children }: FCPropsWC): ReactNode {
  const ref = useRef<StoreApi<AuthStore>>();
  ref.current ??= createAuthStore(INITIAL_STATE);

  return <AuthStoreContext.Provider value={ref.current}>{children}</AuthStoreContext.Provider>;
}
