import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Typography } from '@mui/material';

import { useUserStore } from '~/entities/user';
import { getCustomer } from '~/features/customer/get';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { PageSpinner } from '~/entities/page-spinner';

import { Addresses } from './addresses';
import { ChangePasswordForm } from './change-password-form';
import { PersonalForm } from './personal-form';

import type { JSX } from 'react';
import type { EditMode } from '../model';

export function CustomerProfile(): JSX.Element {
  const [editMode, setEditMode] = useState<EditMode>('None');

  const token = useUserStore((store) => store.token.access_token);

  const customerQuery = useQuery({
    queryKey: [QueryKey.CUSTOMER, token],
    queryFn() {
      return getCustomer({ token });
    },
  });

  const customer = customerQuery.data?.me?.customer;

  if (customerQuery.isPending) {
    return <PageSpinner isEnabled />;
  }

  if (!customer) {
    return <Typography>No customer found</Typography>;
  }

  return (
    <Paper className="relative mx-auto w-full max-w-screen-lg p-2">
      <Divider>Password</Divider>
      <ChangePasswordForm
        customer={customer}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      <Divider>Personal</Divider>
      <PersonalForm
        customer={customer}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      <Divider>Addresses</Divider>
      <Addresses
        customer={customer}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </Paper>
  );
}
