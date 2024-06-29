import { createContext } from 'react';

import type { Store } from './user-store.type';
import type { StoreApi } from 'zustand';

export const UserStoreContext = createContext<Nullable<StoreApi<Store>>>(null);
