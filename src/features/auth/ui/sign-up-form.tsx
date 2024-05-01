import dayjs from 'dayjs';

import { ALLOWED_COUNTRIES } from '~/shared/api/commercetools';
import { Route } from '~/shared/model/route.enum';

import { useSignUp } from '../model';
import { AuthForm } from './auth-form';
import { ChangeFormLink } from './change-form-link';
import { ControlledDatePicker } from './controlled-date-picker';
import { ControlledStringAutocomplete } from './controlled-string-autocomplete';
import { ControlledTextField } from './controlled-text-field';
import { PasswordTextField } from './password-text-field';
import { SubmitButton } from './submit-button';

import type { ReactNode } from 'react';
import type { SignUpDto } from '~/shared/api/commercetools';
import type { CreatePropsFnFactory, InputsData } from '../model';

export const inputsData: InputsData<SignUpDto> = {
  props: {
    email: { autoFocus: true, label: 'E-mail', placeholder: 'user@example.com' },
    password: { label: 'Password', placeholder: 'aaAA11##' },
    firstName: { label: 'First name' },
    lastName: { label: 'Last name' },
    dateOfBirth: { label: 'Date of birth' },
    street: { label: 'Street' },
    city: { label: 'City' },
    postalCode: { label: 'Postal Code' },
    country: { label: 'Country' },
  },
  defaultValues: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: dayjs(),
    street: '',
    city: '',
    postalCode: '',
    country: '',
  },
};

const createInputPropsFactory: CreatePropsFnFactory<SignUpDto> =
  ({ control }) =>
  (name) => ({
    name,
    control,
    textFieldProps: inputsData.props[name],
  });

export function SignUpForm(): ReactNode {
  const { control, handleSubmit } = useSignUp(inputsData.defaultValues);
  const createInputProps = createInputPropsFactory({ control });

  return (
    <AuthForm onSubmit={handleSubmit}>
      <ControlledTextField {...createInputProps('email')} />
      <PasswordTextField {...createInputProps('password')} />
      <ControlledTextField {...createInputProps('firstName')} />
      <ControlledTextField {...createInputProps('lastName')} />
      <ControlledDatePicker {...createInputProps('dateOfBirth')} />
      <ControlledStringAutocomplete {...{ ...createInputProps('country'), options: ALLOWED_COUNTRIES }} />
      <ControlledTextField {...createInputProps('city')} />
      <ControlledTextField {...createInputProps('postalCode')} />
      <ControlledTextField {...createInputProps('street')} />
      <SubmitButton />
      <ChangeFormLink href={Route.AUTH_SIGN_IN}>Already have an account? Sign in</ChangeFormLink>
    </AuthForm>
  );
}
