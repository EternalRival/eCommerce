import { zodResolver } from '@hookform/resolvers/zod';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useGetTokenInfoByCredentialsMutation } from '~/entities/auth-token';
import { useChangePasswordMutation } from '~/entities/customer';
import { PageSpinner } from '~/entities/page-spinner';
import { createFieldPropsFactory, useRevalidateFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { MuiForm, PasswordTextField, SubmitButton } from '~/shared/ui';

import { changePasswordFormDataSchema, useProfileContext } from '../model';

import type { ReactNode } from 'react';
import type { ChangePasswordFormData } from '../model';

export function ChangePasswordForm(): ReactNode {
  const { customer, editMode, setEditMode } = useProfileContext();
  const isEditMode = editMode === 'Password';
  const toggleEditMode = (): void => void setEditMode(isEditMode ? 'None' : 'Password');

  const [isPending, setIsPending] = useState(false);
  const authStore = useAuthStore((store) => store);

  const defaultValues = useMemo(() => ({ currentPassword: '', newPassword: '', newPasswordConfirm: '' }), []);
  const { control, handleSubmit, reset, formState, watch, trigger, getFieldState } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  const queryClient = useQueryClient();
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

          setIsPending(false);
        })(event)
      }
    >
      {isPending && <PageSpinner />}
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
          isPending={isPending}
          isDisabled={!formState.isDirty}
        />
      </Collapse>
    </MuiForm>
  );
}
