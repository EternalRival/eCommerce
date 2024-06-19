import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerQuery } from '~/entities/customer';

import { PersonalForm } from './personal-form';

import type { ReactNode } from 'react';

export function Profile(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const query = useCustomerQuery({ token });

  const customer = query.data?.me?.customer;

  return (
    <Paper className="mx-auto w-full max-w-screen-lg">
      <Divider>Credentials</Divider>
      {customer?.email}

      <Divider>Personal</Divider>
      {customer && <PersonalForm customer={customer} />}

      <Divider>Addresses</Divider>
      <Box component="pre">{JSON.stringify(query.data, null, 2)}</Box>
    </Paper>
  );
}
