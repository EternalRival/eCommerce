import { createContext } from 'react';

import type { StoreApi } from 'zustand';
import type { AuthStore } from './types';

export const AuthStoreContext = createContext<Nullable<StoreApi<AuthStore>>>(null);
