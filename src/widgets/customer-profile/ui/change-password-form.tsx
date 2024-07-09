import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PageSpinner } from '~/entities/page-spinner';
import { useUserStore } from '~/entities/user';
import { getCustomerToken } from '~/features/auth';
import { changePassword } from '~/features/customer/change-password';
import { createFieldPropsFactory, useRevalidateFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { MuiForm, PasswordTextField } from '~/shared/ui';

import { changePasswordFormDataSchema } from '../model';

import type { JSX } from 'react';
import type { ChangePasswordFormData, CustomerProfileFormProps } from '../model';

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export function ChangePasswordForm({ customer, editMode, setEditMode }: CustomerProfileFormProps): JSX.Element {
  const isEditMode = editMode === 'Password';
  const toggleEditMode = (): void => void setEditMode(editMode === 'Password' ? 'None' : 'Password');

  const userStore = useUserStore((store) => store);

  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit, reset, formState, watch, trigger, getFieldState } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  const queryClient = useQueryClient();
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
  });
  const getTokenInfoByCredentialsMutation = useMutation({
    mutationFn: getCustomerToken,
  });

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
  }, [isEditMode, reset]);

  return (
    <MuiForm
      className="mx-auto p-4"
      onSubmit={(event) =>
        void handleSubmit(async (formData) => {
          setIsPending(true);

          try {
            const { currentPassword, newPassword } = formData;

            const { version, email } = customer;
            const token = userStore.token.access_token;

            await changePasswordMutation.mutateAsync({ token, variables: { version, currentPassword, newPassword } });

            await queryClient.invalidateQueries();

            const customerToken = await getTokenInfoByCredentialsMutation.mutateAsync({
              username: email,
              password: newPassword,
            });

            userStore.setCustomerToken(customerToken);

            toggleEditMode();

            toast.success('Password updated!');
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="my-2"
          disabled={!formState.isDirty || isPending}
        >
          Change password
        </Button>
      </Collapse>
    </MuiForm>
  );
}
