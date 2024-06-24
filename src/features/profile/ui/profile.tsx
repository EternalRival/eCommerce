import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerQuery } from '~/entities/customer';

import { ProfileContextProvider } from '../model';
import { Addresses } from './addresses';
import { ChangePasswordForm } from './change-password-form';
import { PersonalForm } from './personal-form';

import type { ReactNode } from 'react';

export function Profile(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const query = useCustomerQuery({ token });

  const customer = query.data?.me?.customer;

  return (
    customer && (
      <ProfileContextProvider customer={customer}>
        <Paper className="mx-auto w-full max-w-screen-lg p-2">
          <Divider>Password</Divider>
          <ChangePasswordForm />
          <Divider>Personal</Divider>
          <PersonalForm />
          <Divider>Addresses</Divider>
          <Addresses />
        </Paper>
      </ProfileContextProvider>
    )
  );
}
