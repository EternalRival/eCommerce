import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { FCProps } from '~/shared/model/types';

type Props<T extends FieldValues> = FCProps<{
  control: Control<T>;
  name: Path<T>;
  fieldProps?: Omit<TextFieldProps, 'name'>;
}>;

export function ControlledTextField<T extends FieldValues>({ name, control, fieldProps }: Props<T>): ReactNode {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <TextField
          required
          size="small"
          fullWidth
          margin="dense"
          {...fieldProps}
          {...field}
          error={invalid}
          helperText={error?.message ?? ' '}
        />
      )}
    />
  );
}
