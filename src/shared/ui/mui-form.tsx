import Box from '@mui/material/Box';
import clsx from 'clsx';

import type { ComponentProps, JSX, PropsWithChildren } from 'react';

type MuiFormProps = Readonly<PropsWithChildren<Pick<ComponentProps<'form'>, 'className' | 'onSubmit'>>>;

export function MuiForm({ children, className, onSubmit }: MuiFormProps): JSX.Element {
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
