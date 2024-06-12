import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useGetTokenInfoByCredentialsMutation } from '~/entities/auth-token';
import { useCustomerStore } from '~/entities/customer-store';
import { useCustomerSignInMutation } from '~/entities/customer';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';

import { useSignInForm } from '../lib';
import { AuthForm } from './auth-form';
import { ChangeFormLink } from './change-form-link';
import { ControlledTextField } from './controlled-text-field';
import { PasswordTextField } from './password-text-field';
import { SubmitButton } from './submit-button';

import type { ReactNode } from 'react';
import type { SignInDto } from '../model';

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
    <AuthForm onSubmit={(event) => void handleSubmit(handleSignInSubmit)(event)}>
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
    </AuthForm>
  );
}
