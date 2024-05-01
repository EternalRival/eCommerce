import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { baseTextFieldProps } from '../model';

import type { ReactNode } from 'react';
import type { ControlledTextFieldProps } from '../model';

export function ControlledTextField<T extends Dict<unknown>>({
  name,
  control,
  textFieldProps,
}: ControlledTextFieldProps<T>): ReactNode {
  const props = { ...baseTextFieldProps, ...textFieldProps };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <TextField
          {...props}
          {...field}
          error={invalid}
          helperText={error?.message ?? ' '}
        />
      )}
    />
  );
}
