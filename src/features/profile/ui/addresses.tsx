import { Box, Collapse } from '@mui/material';
import { useForm } from 'react-hook-form';

import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { ControlledTextField, MuiForm, SubmitButton } from '~/shared/ui';
import { useCustomerQuery } from '~/entities/customer';
import { useAuthStore } from '~/entities/auth-store';

import { useProfileContext } from '../model';

import type { ReactNode } from 'react';

export function Addresses(): ReactNode {
  const { editMode /* setEditMode */ } = useProfileContext();
  const isEditMode = editMode === 'Addresses';

  const token = useAuthStore((store) => store.access_token);
  const customerQuery = useCustomerQuery({ token });
  const customer = customerQuery.data?.me?.customer;

  const defaultValues = {
    '1': '',
    '2': '',
    '3': '',
    '4': '',
  };
  const { control, formState } = useForm({ mode: 'onChange', defaultValues });
  const createProps = createFieldPropsFactory(control);

  return (
    <>
      Addresses
      <Box component="pre">{JSON.stringify(customer, null, 2)}</Box>
      <MuiForm className="mx-auto">
        <ControlledTextField
          {...createProps('1')}
          fieldProps={{ label: '1', placeholder: '', disabled: !isEditMode }}
        />
        <ControlledTextField
          {...createProps('2')}
          fieldProps={{ label: '2', placeholder: '', disabled: !isEditMode }}
        />
        <ControlledTextField
          {...createProps('3')}
          fieldProps={{ label: '3', placeholder: '', disabled: !isEditMode }}
        />
        <ControlledTextField
          {...createProps('4')}
          fieldProps={{ label: '4', placeholder: '', disabled: !isEditMode }}
        />
        <Collapse in={isEditMode}>
          <SubmitButton
            isPending={false /* updateMutation.isPending */}
            isDisabled={!formState.isDirty}
          />
        </Collapse>
      </MuiForm>
    </>
  );
}
