import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import type { TextFieldProps } from '@mui/material/TextField';
import type { Control, FieldValues, Path } from 'react-hook-form';

type ControlledStringAutocompleteProps<T extends FieldValues> = Readonly<{
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
}: ControlledStringAutocompleteProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <Autocomplete
          value={field.value}
          options={options}
          disabled={fieldProps?.disabled}
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
