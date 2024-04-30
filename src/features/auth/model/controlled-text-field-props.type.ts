import type { TextFieldProps } from '@mui/material';
import type { Control, Path } from 'react-hook-form';

export type ControlledTextFieldProps<T extends Dict<unknown>> = Readonly<{
  name: Path<T>;
  control: Control<T>;
  textFieldProps: Omit<TextFieldProps, 'name'>;
}>;
