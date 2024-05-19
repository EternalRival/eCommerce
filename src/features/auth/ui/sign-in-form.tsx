import Divider from '@mui/material/Divider';

import { Route } from '~/shared/model/route.enum';

import { useSignInForm, useSignInMutation } from '../lib';
import { AuthForm } from './auth-form';
import { ChangeFormLink } from './change-form-link';
import { ControlledTextField } from './controlled-text-field';
import { PasswordTextField } from './password-text-field';
import { SubmitButton } from './submit-button';

import type { ReactNode } from 'react';

export function SignInForm(): ReactNode {
  const { createProps, handleSubmit } = useSignInForm();
  const { isPending, signIn } = useSignInMutation();
  const changeFormLinkText = "Don't have an account? Sign Up";

  return (
    <AuthForm onSubmit={handleSubmit(signIn)}>
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
      <ChangeFormLink href={Route.AUTH_SIGN_UP}>{changeFormLinkText}</ChangeFormLink>
    </AuthForm>
  );
}
