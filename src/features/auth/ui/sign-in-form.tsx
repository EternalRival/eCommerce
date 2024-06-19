import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useGetTokenInfoByCredentialsMutation } from '~/entities/auth-token';
import { useCustomerSignInMutation } from '~/entities/customer';
import { useCustomerStore } from '~/entities/customer-store';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';
import { ControlledTextField, MuiForm, PasswordTextField, SubmitButton } from '~/shared/ui';

import { useSignInForm } from '../lib';
import { ChangeFormLink } from './change-form-link';

import type { SignInDto } from '../model';
import type { ReactNode } from 'react';

function useHandleSignInSubmit({
  getCustomerToken,
  signIn,
}: {
  getCustomerToken: ReturnType<typeof useGetTokenInfoByCredentialsMutation>['mutateAsync'];
  signIn: ReturnType<typeof useCustomerSignInMutation>['mutateAsync'];
}) {
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  return async (signInDto: SignInDto): Promise<void> => {
    try {
      const customerToken = await getCustomerToken({
        username: signInDto.email,
        password: signInDto.password,
      });

      const signInResult = await signIn({
        token: customerToken.access_token,
        variables: { draft: signInDto },
      });

      toast.success('Successful sign in');
      authStore.setCustomerToken(customerToken);
      customerStore.setCustomer(signInResult.customerSignMeIn.customer);
    } catch (error) {
      toastifyError(error);
    }
  };
}

export function SignInForm(): ReactNode {
  const { createProps, handleSubmit } = useSignInForm();

  const getTokenInfoByCredentialsMutation = useGetTokenInfoByCredentialsMutation();
  const customerSignInMutation = useCustomerSignInMutation();

  const handleSignInSubmit = useHandleSignInSubmit({
    getCustomerToken: getTokenInfoByCredentialsMutation.mutateAsync,
    signIn: customerSignInMutation.mutateAsync,
  });

  const isPending = getTokenInfoByCredentialsMutation.isPending || customerSignInMutation.isPending;

  return (
    <MuiForm onSubmit={(event) => void handleSubmit(handleSignInSubmit)(event)}>
      <Divider>Credentials</Divider>
      <ControlledTextField
        {...createProps('email')}
        fieldProps={{
          label: 'E-mail',
          placeholder: 'user@example.com',
          autoFocus: true,
        }}
      />
      <PasswordTextField
        {...createProps('password')}
        fieldProps={{
          label: 'Password',
          placeholder: 'aaAA11##',
        }}
      />

      <SubmitButton isPending={isPending} />
      <ChangeFormLink href={Route.AUTH_SIGN_UP}>Don&apos;t have an account? Sign Up</ChangeFormLink>
    </MuiForm>
  );
}
