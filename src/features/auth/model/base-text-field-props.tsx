import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import type { UseFormRegisterReturn } from 'react-hook-form';

export const baseTextFieldProps: MuiTextFieldProps = {
  margin: 'normal',
  fullWidth: true,
  required: true,
} as const;

export type TextFieldProps = Readonly<{
  errorText: Optional<string>;
  registerProps: UseFormRegisterReturn;
}>;
