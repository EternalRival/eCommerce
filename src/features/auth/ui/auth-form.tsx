import Box from '@mui/material/Box';

import type { ComponentProps, ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<Pick<ComponentProps<'form'>, 'onSubmit' | 'children'>>;

export function AuthForm({ children, onSubmit }: Props): ReactNode {
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      className="max-w-sm"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
}
