import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PageSpinner } from '~/entities/page-spinner';
import { useUserStore } from '~/entities/user';
import { updateCustomer } from '~/features/customer/update';
import { dateFormat } from '~/shared/lib/dayjs';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { ControlledDatePicker, ControlledTextField, MuiForm } from '~/shared/ui';

import { createCustomerUpdateActions } from '../lib';
import { personalFormDataSchema } from '../model';

import type { CustomerProfileFormProps, PersonalFormData } from '../model';

export function PersonalForm({ customer, editMode, setEditMode }: CustomerProfileFormProps): JSX.Element {
  const isEditMode = editMode === 'Personal';
  const toggleEditMode = (): void => void setEditMode(editMode === 'Personal' ? 'None' : 'Personal');

  const token = useUserStore((store) => store.token.access_token);

  const [isPending, setIsPending] = useState(false);

  const defaultValues = useMemo(
    () => ({
      email: customer.email,
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      dateOfBirth: customer.dateOfBirth ?? dayjs().format(dateFormat),
    }),
    [customer.dateOfBirth, customer.email, customer.firstName, customer.lastName]
  );

  const { control, handleSubmit, formState, reset } = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateCustomer,
  });

  useEffect(() => {
    if (!isEditMode) {
      reset(defaultValues);
    }
  }, [defaultValues, isEditMode, reset]);

  return (
    <MuiForm
      className="mx-auto p-4"
      onSubmit={(event) =>
        void handleSubmit(async (formData) => {
          setIsPending(true);

          try {
            const actions = createCustomerUpdateActions(formData, defaultValues);

            await updateMutation.mutateAsync({ token, variables: { version: customer.version, actions } });
            await queryClient.invalidateQueries({ queryKey: [QueryKey.CUSTOMER] });
            toggleEditMode();
            toast.success(JSON.stringify('Personal data updated!'));
          } catch (error) {
            toastifyError(error);
          }

          setIsPending(false);
        })(event)
      }
    >
      <PageSpinner isEnabled={isPending} />

      <FormControlLabel
        control={
          <Switch
            checked={isEditMode}
            onChange={() => void toggleEditMode()}
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
        fieldProps={{ label: 'Date of birth', disabled: !isEditMode }}
      />
      <Collapse in={isEditMode}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="my-2"
          disabled={!formState.isDirty || isPending}
        >
          Change personal data
        </Button>
      </Collapse>
    </MuiForm>
  );
}
