import { Collapse, Divider } from '@mui/material';

import { ALLOWED_COUNTRY_NAMES } from '~/shared/api/commercetools';

import { useSignUpForm, useSignUpMutation } from '../lib';
import { AuthForm } from './auth-form';
import { ControlledCheckbox } from './controlled-checkbox';
import { ControlledDatePicker } from './controlled-date-picker';
import { ControlledStringAutocomplete } from './controlled-string-autocomplete';
import { ControlledTextField } from './controlled-text-field';
import { PasswordTextField } from './password-text-field';
import { SubmitButton } from './submit-button';

import type { ReactNode } from 'react';

export function SignUpForm(): ReactNode {
  const { createProps, handleSubmit, watch } = useSignUpForm();
  const { isPending, signUp } = useSignUpMutation();

  return (
    <AuthForm onSubmit={handleSubmit(signUp)}>
      <Divider>Credentials</Divider>
      <ControlledTextField
        {...createProps('email')}
        fieldProps={{ label: 'E-mail', placeholder: 'user@example.com', autoFocus: true }}
      />
      <PasswordTextField
        {...createProps('password')}
        fieldProps={{ label: 'Password', placeholder: 'aaAA11##' }}
      />
      <Divider>Personal</Divider>
      <ControlledTextField
        {...createProps('firstName')}
        fieldProps={{ label: 'First name', placeholder: 'John' }}
      />
      <ControlledTextField
        {...createProps('lastName')}
        fieldProps={{ label: 'Last name', placeholder: 'Doe' }}
      />
      <ControlledDatePicker
        {...createProps('dateOfBirth')}
        fieldProps={{ label: 'Date of birth' }}
      />

      <Divider>Shipping Address</Divider>
      <ControlledStringAutocomplete
        {...createProps('shippingCountry')}
        fieldProps={{ label: 'Country' }}
        options={ALLOWED_COUNTRY_NAMES}
      />
      <ControlledTextField
        {...createProps('shippingPostalCode')}
        fieldProps={{ label: 'Postal code' }}
      />
      <ControlledTextField
        {...createProps('shippingCity')}
        fieldProps={{ label: 'City' }}
      />
      <ControlledTextField
        {...createProps('shippingStreet')}
        fieldProps={{ label: 'Street' }}
      />
      <ControlledCheckbox
        {...createProps('shippingIsDefault')}
        labelProps={{ label: 'Set as default' }}
      />
      <ControlledCheckbox
        {...createProps('isSingleAddressMode')}
        labelProps={{ label: 'Use shipping address as billing address' }}
      />

      <Collapse in={!watch('isSingleAddressMode')}>
        <Divider>Billing Address</Divider>
        <ControlledStringAutocomplete
          {...createProps('billingCountry')}
          fieldProps={{ label: 'Country' }}
          options={ALLOWED_COUNTRY_NAMES}
        />
        <ControlledTextField
          {...createProps('billingPostalCode')}
          fieldProps={{ label: 'Postal code' }}
        />
        <ControlledTextField
          {...createProps('billingCity')}
          fieldProps={{ label: 'City' }}
        />
        <ControlledTextField
          {...createProps('billingStreet')}
          fieldProps={{ label: 'Street' }}
        />
        <ControlledCheckbox
          {...createProps('billingIsDefault')}
          labelProps={{ label: 'Set as default' }}
        />
      </Collapse>
      <SubmitButton isPending={isPending} />
    </AuthForm>
  );
}
