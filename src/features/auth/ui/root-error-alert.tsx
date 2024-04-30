import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import type { ReactNode } from 'react';

export function RootErrorAlert({ message }: Readonly<{ message?: string }>): ReactNode {
  return (
    <Collapse in={Boolean(message)}>
      <Alert severity="error">{message}</Alert>
    </Collapse>
  );
}
