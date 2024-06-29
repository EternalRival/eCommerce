import type { Dispatch, SetStateAction } from 'react';
import type { Customer } from './customer.type';
import type { EditMode } from './edit-mode.type';

export type CustomerProfileFormProps = Readonly<{
  customer: Customer;
  editMode: EditMode;
  setEditMode: Dispatch<SetStateAction<EditMode>>;
}>;
