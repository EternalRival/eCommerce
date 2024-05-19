import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from 'react-hook-form';

import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { FCProps } from '~/shared/model/types';

type Props<T extends FieldValues> = FCProps<{
  control: Control<T>;
  name: Path<T>;
  labelProps: Omit<FormControlLabelProps, 'name' | 'control'>;
}>;

export function ControlledCheckbox<T extends FieldValues>({ name, control, labelProps }: Props<T>): ReactNode {
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
