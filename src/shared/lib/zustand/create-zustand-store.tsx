import { useContext, useRef } from 'react';
import { useStore as useZustandStore } from 'zustand';

import type { Context, FC, ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { FCPropsWC } from '~/shared/model/types';

type UseStore<S> = <T>(selector: (store: S) => T) => T;

type CreateZustandStoreProps<S> = {
  context: Context<Nullable<StoreApi<S>>>;
  createStoreFactory: () => StoreApi<S>;
};

export function createZustandStore<S>({
  context,
  createStoreFactory: createStoreFn,
}: CreateZustandStoreProps<S>): [FC<FCPropsWC>, UseStore<S>] {
  function StoreProvider({ children }: FCPropsWC): ReactNode {
    const storeRef = useRef<StoreApi<S>>();

    storeRef.current ??= createStoreFn();

    return <context.Provider value={storeRef.current}>{children}</context.Provider>;
  }

  const useStore: UseStore<S> = (selector) => {
    const ctx = useContext(context);

    if (!ctx) {
      throw new Error('useStore must be use within Provider');
    }

    return useZustandStore(ctx, selector);
  };

  return [StoreProvider, useStore];
}
