import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { baseTextFieldProps } from '../model';

import type { ReactNode } from 'react';
import type { ControlledTextFieldProps } from '../model';

export function ControlledStringAutocomplete<T extends Dict<unknown>>({
  name,
  control,
  options,
  textFieldProps,
}: Readonly<{ options: string[] } & ControlledTextFieldProps<T>>): ReactNode {
  const props = { ...baseTextFieldProps, ...textFieldProps };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField
              {...props}
              {...params}
              error={invalid}
              helperText={error?.message ?? ' '}
            />
          )}
          size={textFieldProps.size ?? baseTextFieldProps.size}
          autoHighlight
          freeSolo
          getOptionLabel={(option) => option}
          onInputChange={(_, data) => void field.onChange(data)}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}
