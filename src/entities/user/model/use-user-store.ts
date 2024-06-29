import { useContext } from 'react';
import { useStore } from 'zustand';

import { UserStoreContext } from './user-store.context';

import type { Store } from './user-store.type';

export function useUserStore<T>(selector: (store: Store) => T): T {
  const ctx = useContext(UserStoreContext);

  if (!ctx) {
    throw new Error('useStore must be use within Provider');
  }

  return useStore(ctx, selector);
}
