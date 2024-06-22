import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useGetTokenInfoByCredentialsMutation, useGetTokenInfoMutation } from '~/entities/auth-token';
import { useCustomerSignInMutation, useCustomerSignUpMutation } from '~/entities/customer';
import { ALLOWED_COUNTRY_NAMES } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';
import {
  ControlledCheckbox,
  ControlledDatePicker,
  ControlledStringAutocomplete,
  ControlledTextField,
  MuiForm,
  PasswordTextField,
  SubmitButton,
} from '~/shared/ui';

import { createCustomerSignUpDraft, useSignUpForm } from '../lib';
import { ChangeFormLink } from './change-form-link';

import type { ReactNode } from 'react';
import type { SignUpFormData } from '../model';

function useHandleSignUpSubmit({
  getGuestToken,
  signUp,
  getCustomerToken,
  signIn,
}: {
  getGuestToken: ReturnType<typeof useGetTokenInfoMutation>['mutateAsync'];
  signUp: ReturnType<typeof useCustomerSignUpMutation>['mutateAsync'];
  getCustomerToken: ReturnType<typeof useGetTokenInfoByCredentialsMutation>['mutateAsync'];
  signIn: ReturnType<typeof useCustomerSignInMutation>['mutateAsync'];
}) {
  const authStore = useAuthStore((store) => store);

  return async (signUpFormData: SignUpFormData): Promise<void> => {
    try {
      const guestToken = authStore.type === 'guest' ? authStore : await getGuestToken({});

      await signUp({
        token: guestToken.access_token,
        variables: { draft: createCustomerSignUpDraft(signUpFormData) },
      });

      const customerToken = await getCustomerToken({
        username: signUpFormData.email,
        password: signUpFormData.password,
      });

      await signIn({
        token: customerToken.access_token,
        variables: {
          draft: { email: signUpFormData.email, password: signUpFormData.password },
        },
      });

      toast.success('Successful sign up');
      authStore.setCustomerToken(customerToken);
    } catch (error) {
      toastifyError(error);
    }
  };
}

export function SignUpForm(): ReactNode {
  const { createProps, handleSubmit, watch } = useSignUpForm();

  const getTokenInfoMutation = useGetTokenInfoMutation();
  const customerSignUpMutation = useCustomerSignUpMutation();
  const getTokenInfoByCredentialsMutation = useGetTokenInfoByCredentialsMutation();
  const customerSignInMutation = useCustomerSignInMutation();

  const handleSignUpSubmit = useHandleSignUpSubmit({
    getGuestToken: getTokenInfoMutation.mutateAsync,
    signUp: customerSignUpMutation.mutateAsync,
    getCustomerToken: getTokenInfoByCredentialsMutation.mutateAsync,
    signIn: customerSignInMutation.mutateAsync,
  });

  const isPending =
    getTokenInfoMutation.isPending ||
    customerSignUpMutation.isPending ||
    getTokenInfoByCredentialsMutation.isPending ||
    customerSignInMutation.isPending;

  return (
    <MuiForm onSubmit={(event) => void handleSubmit(handleSignUpSubmit)(event)}>
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
      <ChangeFormLink href={Route.AUTH_SIGN_IN}>Already have an account? Sign in</ChangeFormLink>
    </MuiForm>
  );
}
