import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useCustomerStore } from '~/entities/customer-store';

import type { ReactNode } from 'react';

export function ProfilePage(): ReactNode {
  const { email } = useCustomerStore((store) => store);

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Profile Page
      </Typography>
      <Stack className="self-start">{email}</Stack>
    </>
  );
}
