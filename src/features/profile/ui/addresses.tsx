import { Box } from '@mui/material';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';
import type { Customer } from '../model';

export function Addresses({ customer }: FCProps<{ customer: Customer }>): ReactNode {
  return (
    <>
      Addresses
      <Box component="pre">{JSON.stringify(customer, null, 2)}</Box>
    </>
  );
}
