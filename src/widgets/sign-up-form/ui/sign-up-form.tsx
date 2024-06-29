import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { PageSpinner } from '~/entities/page-spinner';
import { ALLOWED_COUNTRY_NAMES } from '~/shared/api/commercetools';
import { dateFormat } from '~/shared/lib/dayjs';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { Route } from '~/shared/model/route.enum';
import {
  ControlledCheckbox,
  ControlledDatePicker,
  ControlledStringAutocomplete,
  ControlledTextField,
  MuiForm,
  PasswordTextField,
} from '~/shared/ui';
import { useUserStore } from '~/entities/user';
import { getCustomerToken, getGuestToken, signIn, signUp } from '~/features/auth';
import { toastifyError } from '~/shared/lib/react-toastify';

import { signUpFormDataSchema } from '../model';
import { createSignUpDraft } from '../lib';

import type { SignUpFormData } from '../model';

export function SignUpForm(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const userStore = useUserStore((store) => store);

  const { control, handleSubmit, watch } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormDataSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: dayjs().format(dateFormat),
      shippingCountry: '',
      shippingPostalCode: '',
      shippingCity: '',
      shippingStreet: '',
      shippingIsDefault: true,
      isSingleAddressMode: true,
      billingCountry: '',
      billingPostalCode: '',
      billingCity: '',
      billingStreet: '',
      billingIsDefault: true,
    },
  });
  const createProps = createFieldPropsFactory(control);

  const getGuestTokenMutation = useMutation({
    mutationFn: getGuestToken,
  });
  const signUpMutation = useMutation({
    mutationFn: signUp,
  });
  const getCustomerTokenMutation = useMutation({
    mutationFn: getCustomerToken,
  });
  const signInMutation = useMutation({
    mutationFn: signIn,
  });

  return (
    <Paper className="p-4">
      <Typography
        component="h1"
        variant="h5"
        className="text-center"
      >
        Sign up
      </Typography>

      <PageSpinner isEnabled={isPending} />

      <MuiForm
        onSubmit={(event) =>
          void handleSubmit(async (formData) => {
            setIsPending(true);

            try {
              const guestToken =
                userStore.token.type === 'guest' ? userStore.token : await getGuestTokenMutation.mutateAsync();

              await signUpMutation.mutateAsync({
                token: guestToken.access_token,
                variables: {
                  draft: createSignUpDraft(formData),
                },
              });

              const customerToken = await getCustomerTokenMutation.mutateAsync({
                username: formData.email,
                password: formData.password,
              });

              await signInMutation.mutateAsync({
                token: customerToken.access_token,
                variables: {
                  draft: {
                    email: formData.email,
                    password: formData.password,
                  },
                },
              });

              userStore.setCustomerToken(customerToken);
              toast.success('Successful sign up');
            } catch (error) {
              toastifyError(error);
            }

            setIsPending(false);
          })(event)
        }
      >
        <Divider className="mt-2">Credentials</Divider>
        <ControlledTextField
          {...createProps('email')}
          fieldProps={{ label: 'E-mail', placeholder: 'user@example.com', autoFocus: true }}
        />
        <PasswordTextField
          {...createProps('password')}
          fieldProps={{ label: 'Password', placeholder: 'aaAA11##' }}
        />

        <Divider className="mt-2">Personal</Divider>
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

        <Divider className="mt-2">Shipping Address</Divider>
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
          <Divider className="mt-2">Billing Address</Divider>
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="my-2"
          disabled={isPending}
        >
          Submit
        </Button>

        <Box className="text-end">
          <Link
            component={NextLink}
            href={Route.AUTH_SIGN_IN}
            variant="body2"
          >
            Already have an account? Sign in
          </Link>
        </Box>
      </MuiForm>
    </Paper>
  );
}
