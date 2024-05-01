import { Route } from '~/shared/model/route.enum';

import { useSignIn } from '../model';
import { AuthForm } from './auth-form';
import { ChangeFormLink } from './change-form-link';
import { ControlledTextField } from './controlled-text-field';
import { PasswordTextField } from './password-text-field';
import { RootErrorAlert } from './root-error-alert';
import { SubmitButton } from './submit-button';

import type { ReactNode } from 'react';
import type { SignInDto } from '~/shared/api/commercetools';
import type { CreatePropsFnFactory, InputsData } from '../model';

const inputsData: InputsData<SignInDto> = {
  props: {
    email: { autoFocus: true, label: 'E-mail', placeholder: 'user@example.com' },
    password: { label: 'Password', placeholder: 'aaAA11##' },
  },
  defaultValues: {
    email: '',
    password: '',
  },
};

const createInputPropsFactory: CreatePropsFnFactory<SignInDto> =
  ({ control }) =>
  (name) => ({
    name,
    control,
    textFieldProps: inputsData.props[name],
  });

export function SignInForm(): ReactNode {
  const { control, handleSubmit, errors } = useSignIn(inputsData.defaultValues);
  const createInputProps = createInputPropsFactory({ control });

  return (
    <AuthForm onSubmit={handleSubmit}>
      <ControlledTextField {...createInputProps('email')} />
      <PasswordTextField {...createInputProps('password')} />
      <RootErrorAlert message={errors.root?.message} />
      <SubmitButton />
      <ChangeFormLink href={Route.AUTH_SIGN_UP}>Don&apos;t have an account? Sign Up</ChangeFormLink>
    </AuthForm>
  );
}
