import type { TextFieldProps } from '@mui/material';
import type { Control, Path } from 'react-hook-form';
import type { FCProps } from '~/shared/model/types';

export type ControlledTextFieldProps<T extends Dict<unknown>> = FCProps<{
  name: Path<T>;
  control: Control<T>;
  textFieldProps: Omit<TextFieldProps, 'name'>;
}>;
