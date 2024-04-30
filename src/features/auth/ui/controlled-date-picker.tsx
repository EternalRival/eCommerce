import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

import { baseTextFieldProps } from '../model';

import type { ReactNode } from 'react';
import type { ControlledTextFieldProps } from '../model';

export function ControlledDatePicker<T extends Dict<unknown>>({
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
        <DatePicker
          slotProps={{
            textField: {
              ...props,
              ...field,
              error: invalid,
              helperText: error?.message ?? ' ',
            },
          }}
        />
      )}
    />
  );
}
