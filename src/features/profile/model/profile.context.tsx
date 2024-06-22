import { createContext, useContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';
import type { Customer } from './customer.type';
import type { FCPropsWC } from '~/shared/model/types';

type EditMode = 'None' | 'Password' | 'Personal' | 'Addresses';

type State = {
  customer: Customer;
  editMode: EditMode;
};

type Actions = {
  setEditMode: (editMode: State['editMode']) => void;
};

type Store = State & Actions;

const context = createContext<Nullable<Store>>(null);

export function ProfileContextProvider({ children, customer }: FCPropsWC<{ customer: Customer }>): ReactNode {
  const [editMode, setEditMode] = useState<EditMode>('None');

  const store = useMemo(() => ({ customer, editMode, setEditMode }), [customer, editMode]);

  return <context.Provider value={store}>{children}</context.Provider>;
}

export function useProfileContext(): Store {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('useProfileContext must be use within ProfileContextProvider');
  }

  return ctx;
}
