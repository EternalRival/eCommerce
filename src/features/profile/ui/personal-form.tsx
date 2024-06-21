import { zodResolver } from '@hookform/resolvers/zod';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerUpdateMutation } from '~/entities/customer';
import { dateOfBirthSchema, emailSchema, nameSchema } from '~/shared/api/commercetools';
import { dateFormat } from '~/shared/lib/dayjs';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { ControlledDatePicker, ControlledTextField, MuiForm, SubmitButton } from '~/shared/ui';

import type { ReactNode } from 'react';
import type { MyCustomerUpdateAction } from '~/entities/customer';
import type { FCProps } from '~/shared/model/types';
import type { Customer } from '../model';

const personalFormDtoSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: dateOfBirthSchema,
});

type PersonalFormDto = z.infer<typeof personalFormDtoSchema>;

export function PersonalForm({ customer }: FCProps<{ customer: Customer }>): ReactNode {
  const token = useAuthStore((store) => store.access_token);
  const [isEditMode, setIsEditMode] = useState(false);

  const defaultValues = {
    email: customer.email,
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    dateOfBirth: customer.dateOfBirth ?? dayjs().format(dateFormat),
  };

  const { control, handleSubmit, reset, formState } = useForm<PersonalFormDto>({
    resolver: zodResolver(personalFormDtoSchema),
    mode: 'onChange',
    defaultValues,
  });

  const createProps = createFieldPropsFactory(control);

  const queryClient = useQueryClient();

  const updateMutation = useCustomerUpdateMutation({
    onSuccess() {
      toast.success(JSON.stringify('Personal data updated!'));
      queryClient.invalidateQueries({ queryKey: [QueryKey.CUSTOMER] }).catch(toastifyError);
      setIsEditMode((value) => !value);
      reset(defaultValues, { keepValues: true });
    },
  });

  return (
    <MuiForm
      className="mx-auto"
      onSubmit={(event) =>
        void handleSubmit((formData) => {
          const { email, firstName, lastName, dateOfBirth } = formData;

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

          updateMutation.mutate({ token, variables: { version: customer.version, actions } });
        })(event)
      }
    >
      <FormControlLabel
        control={
          <Switch
            checked={isEditMode}
            onChange={() => {
              setIsEditMode((value) => !value);
              reset(defaultValues);
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
          isPending={updateMutation.isPending}
          isDisabled={!formState.isDirty}
        />
      </Collapse>
    </MuiForm>
  );
}
