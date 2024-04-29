import { TextField } from '@mui/material';

import { Route } from '~/shared/model/route.enum';

import { useSignUp } from '../model';
import { ChangeFormLink } from './change-form-link';
import { EmailTextField } from './email-text-field';
import { PasswordTextField } from './password-text-field';
import { SubmitButton } from './submit-button';
import { AuthForm } from './auth-form';
import { baseTextFieldProps } from '../model/base-text-field-props';

import type { TextFieldProps } from '../model/base-text-field-props';
import type { ReactNode } from 'react';

/** 
email
password
firstName
lastName
dateOfBirth
address
  street
  city
  postalCode
  country
*/

function CustomTextField({ errorText, registerProps }: TextFieldProps): ReactNode {
  return (
    <TextField
      autoFocus
      {...baseTextFieldProps}
      {...registerProps}
      label="E-mail"
      placeholder="user@example.com"
      error={Boolean(errorText)}
      helperText={errorText ?? ' '}
    />
  );
} // todo стандартизировать и заполнять из объекта

export function SignUpForm(): ReactNode {
  const { register, handleSubmit, errors } = useSignUp();

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
      <CustomTextField
        errorText={errors.firstName?.message}
        registerProps={register('firstName')}
      />
      <CustomTextField
        errorText={errors.lastName?.message}
        registerProps={register('lastName')}
      />
      <SubmitButton />
      <ChangeFormLink href={Route.AUTH_SIGN_IN}>Already have an account? Sign in</ChangeFormLink>
    </AuthForm>
  );
}
