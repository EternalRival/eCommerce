import { useContext } from 'react';
import { useStore } from 'zustand';

import { AuthStoreContext } from '../model';

import type { AuthStore } from '../model';

export function useAuthStore<T>(selector: (store: AuthStore) => T): T {
  const ctx = useContext(AuthStoreContext);

  if (!ctx) {
    throw new Error(`${useAuthStore.name} must be use within Provider`);
  }

  return useStore(ctx, selector);
}
