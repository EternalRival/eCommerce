import { Route } from '~/shared/model/route.enum';

import { useSignIn } from '../model';
import { ChangeFormLink } from './change-form-link';
import { EmailTextField } from './email-text-field';
import { PasswordTextField } from './password-text-field';
import { RootErrorAlert } from './root-error-alert';
import { SubmitButton } from './submit-button';
import { AuthForm } from './auth-form';

import type { ReactNode } from 'react';

export function SignInForm(): ReactNode {
  const { register, handleSubmit, errors } = useSignIn();

  return (
    <AuthForm onSubmit={handleSubmit}>
      <EmailTextField
        errorText={errors.email?.message}
        registerProps={register('email')}
      />
      <PasswordTextField
        errorText={errors.password?.message}
        registerProps={register('password')}
      />
      <RootErrorAlert message={errors.root?.message} />
      <SubmitButton />
      <ChangeFormLink href={Route.AUTH_SIGN_UP}>Don&apos;t have an account? Sign Up</ChangeFormLink>
    </AuthForm>
  );
}
