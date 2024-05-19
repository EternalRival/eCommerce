import Autocomplete from '@mui/material/Autocomplete';
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
  options: string[];
}>;

export function ControlledStringAutocomplete<T extends FieldValues>({
  control,
  name,
  fieldProps,
  options,
}: Props<T>): ReactNode {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField
              required
              margin="dense"
              {...fieldProps}
              {...params}
              error={invalid}
              helperText={error?.message ?? ' '}
            />
          )}
          size="small"
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
