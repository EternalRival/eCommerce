import TextField from '@mui/material/TextField';

import { baseTextFieldProps } from '../model/base-text-field-props';

import type { TextFieldProps } from '../model/base-text-field-props';
import type { ReactNode } from 'react';

export function EmailTextField({ errorText, registerProps }: TextFieldProps): ReactNode {
  return (
    <TextField
      autoFocus
      {...baseTextFieldProps}
      {...registerProps}
      label="E-mail"
      placeholder="user@example.com"
      error={Boolean(errorText)}
      helperText={errorText ?? ' '}
    />
  );
}
