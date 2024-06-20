import { zodResolver } from '@hookform/resolvers/zod';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useAuthStore } from '~/entities/auth-store';
import { useGetTokenInfoByCredentialsMutation } from '~/entities/auth-token';
import { useChangePasswordMutation } from '~/entities/customer';
import { PageSpinner } from '~/entities/page-spinner';
import { passwordSchema } from '~/shared/api/commercetools';
import { createFieldPropsFactory, useRevalidateFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { MuiForm, PasswordTextField, SubmitButton } from '~/shared/ui';

import type { ReactNode } from 'react';
import type { QueryCustomerReturn } from '~/entities/customer';
import type { FCProps } from '~/shared/model/types';

const changePasswordDtoSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirm: passwordSchema,
  })
  .superRefine(({ currentPassword, newPassword, newPasswordConfirm }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The new password must not match the old password',
        path: ['newPassword'],
      });
    }

    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({ code: 'custom', message: 'Passwords must match', path: ['newPasswordConfirm'] });
    }
  });

type ChangePasswordDto = z.infer<typeof changePasswordDtoSchema>;

export function ChangePasswordForm({
  customer,
}: FCProps<{ customer: NonNullable<QueryCustomerReturn['me']>['customer'] }>): ReactNode {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBackdropEnabled, setIsBackdropEnabled] = useState(false);
  const authStore = useAuthStore((store) => store);

  const queryClient = useQueryClient();

  const defaultValues = { currentPassword: '', newPassword: '', newPasswordConfirm: '' };
  const { control, handleSubmit, reset, formState, watch, trigger, getFieldState } = useForm<ChangePasswordDto>({
    resolver: zodResolver(changePasswordDtoSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  const changePasswordMutation = useChangePasswordMutation();

  const getTokenInfoByCredentialsMutation = useGetTokenInfoByCredentialsMutation();

  const passwordFieldBaseProps = {
    InputLabelProps: { shrink: isEditMode },
    placeholder: '********',
    disabled: !isEditMode,
  };

  const useRevalidate = useRevalidateFactory({ watch, trigger, getFieldState });

  useRevalidate('currentPassword', 'newPassword');
  useRevalidate('newPassword', 'newPasswordConfirm');

  return (
    <MuiForm
      className="mx-auto"
      onSubmit={(event) =>
        void handleSubmit(async (formData) => {
          setIsBackdropEnabled(true);

          try {
            const { currentPassword, newPassword } = formData;

            const { version, email } = customer;
            const token = authStore.access_token;

            await changePasswordMutation.mutateAsync({ token, variables: { version, currentPassword, newPassword } });

            await queryClient.invalidateQueries();

            const customerToken = await getTokenInfoByCredentialsMutation.mutateAsync({
              username: email,
              password: newPassword,
            });

            toast.success('Password updated!');
            authStore.setCustomerToken(customerToken);
          } catch (error) {
            toastifyError(error);
          }

          setIsBackdropEnabled(false);
        })(event)
      }
    >
      {isBackdropEnabled && <PageSpinner />}
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
      <PasswordTextField
        {...createProps('currentPassword')}
        fieldProps={{ ...passwordFieldBaseProps, label: 'Current password' }}
      />
      <PasswordTextField
        {...createProps('newPassword')}
        fieldProps={{ ...passwordFieldBaseProps, label: 'New password' }}
      />
      <PasswordTextField
        {...createProps('newPasswordConfirm')}
        fieldProps={{ ...passwordFieldBaseProps, label: 'Confirm password' }}
      />
      <Collapse in={isEditMode}>
        <SubmitButton
          isPending={changePasswordMutation.isPending}
          isDisabled={!formState.isDirty}
        />
      </Collapse>
    </MuiForm>
  );
}
