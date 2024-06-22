import { zodResolver } from '@hookform/resolvers/zod';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerUpdateMutation } from '~/entities/customer';
import { PageSpinner } from '~/entities/page-spinner';
import { dateFormat } from '~/shared/lib/dayjs';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { ControlledDatePicker, ControlledTextField, MuiForm, SubmitButton } from '~/shared/ui';

import { personalFormDataSchema, useProfileContext, useResetForm } from '../model';

import type { ReactNode } from 'react';
import type { MyCustomerUpdateAction } from '~/entities/customer';
import type { PersonalFormData } from '../model';

export function PersonalForm(): ReactNode {
  const { customer, editMode, setEditMode } = useProfileContext();
  const isEditMode = editMode === 'Personal';

  const [isPending, setIsPending] = useState(false);
  const token = useAuthStore((store) => store.access_token);

  const defaultValues = {
    email: customer.email,
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    dateOfBirth: customer.dateOfBirth ?? dayjs().format(dateFormat),
  };

  const { control, handleSubmit, reset, formState } = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  const queryClient = useQueryClient();
  const updateMutation = useCustomerUpdateMutation();

  useResetForm({ shouldReset: !isEditMode, reset: () => void reset(defaultValues) });

  function createCustomerUpdateActions({
    email,
    firstName,
    lastName,
    dateOfBirth,
  }: PersonalFormData): MyCustomerUpdateAction[] {
    const actions: MyCustomerUpdateAction[] = [];

    if (email !== defaultValues.email) {
      actions.push({ changeEmail: { email } });
    }

    if (firstName !== defaultValues.firstName) {
      actions.push({ setFirstName: { firstName } });
    }

    if (lastName !== defaultValues.lastName) {
      actions.push({ setLastName: { lastName } });
    }

    if (dateOfBirth !== defaultValues.dateOfBirth) {
      actions.push({ setDateOfBirth: { dateOfBirth } });
    }

    return actions;
  }

  return (
    <MuiForm
      className="mx-auto"
      onSubmit={(event) =>
        void handleSubmit(async (formData) => {
          setIsPending(true);

          try {
            const actions = createCustomerUpdateActions(formData);

            await updateMutation.mutateAsync({ token, variables: { version: customer.version, actions } });
            await queryClient.invalidateQueries({ queryKey: [QueryKey.CUSTOMER] });
            setEditMode(isEditMode ? 'None' : 'Personal');
            toast.success(JSON.stringify('Personal data updated!'));
          } catch (error) {
            toastifyError(error);
          }

          setIsPending(false);
        })(event)
      }
    >
      {isPending && <PageSpinner />}
      <FormControlLabel
        control={
          <Switch
            checked={isEditMode}
            onChange={() => {
              setEditMode(isEditMode ? 'None' : 'Personal');
            }}
          />
        }
        label="Edit mode"
        className="select-none"
      />
      <ControlledTextField
        {...createProps('email')}
        fieldProps={{ label: 'E-mail', placeholder: 'user@example.com', disabled: !isEditMode }}
      />
      <ControlledTextField
        {...createProps('firstName')}
        fieldProps={{ label: 'First name', placeholder: 'John', disabled: !isEditMode }}
      />
      <ControlledTextField
        {...createProps('lastName')}
        fieldProps={{ label: 'Last name', placeholder: 'Doe', disabled: !isEditMode }}
      />
      <ControlledDatePicker
        {...createProps('dateOfBirth')}
        fieldProps={{ label: 'Date of birth' }}
        disabled={!isEditMode}
      />
      <Collapse in={isEditMode}>
        <SubmitButton
          isPending={isPending}
          isDisabled={!formState.isDirty}
        />
      </Collapse>
    </MuiForm>
  );
}
