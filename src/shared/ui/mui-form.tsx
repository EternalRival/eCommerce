import Box from '@mui/material/Box';
import clsx from 'clsx';

import type { ComponentProps, ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<Pick<ComponentProps<'form'>, 'className' | 'children' | 'onSubmit'>>;

export function MuiForm({ children, className, onSubmit }: Props): ReactNode {
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      className={clsx('max-w-sm', className)}
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
}
