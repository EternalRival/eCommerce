import Box from '@mui/material/Box';

import type { ComponentProps, ReactNode } from 'react';

type Props = Pick<ComponentProps<'form'>, 'onSubmit' | 'children'>;

export function AuthForm({ children, onSubmit }: Props): ReactNode {
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      className="max-w-md"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
}
