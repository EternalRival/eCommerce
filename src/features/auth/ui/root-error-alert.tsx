import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export function RootErrorAlert({ message }: FCProps<{ message?: string }>): ReactNode {
  return (
    <Collapse in={Boolean(message)}>
      <Alert severity="error">{message}</Alert>
    </Collapse>
  );
}
