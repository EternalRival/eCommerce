import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from 'react-hook-form';

import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { Control, FieldValues, Path } from 'react-hook-form';

type ControlledCheckboxProps<T extends FieldValues> = Readonly<{
  control: Control<T>;
  name: Path<T>;
  labelProps: Omit<FormControlLabelProps, 'name' | 'control'>;
}>;

export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  labelProps,
}: ControlledCheckboxProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <FormControlLabel
          {...labelProps}
          {...field}
          checked={Boolean(value)}
          control={<Checkbox />}
        />
      )}
    />
  );
}
