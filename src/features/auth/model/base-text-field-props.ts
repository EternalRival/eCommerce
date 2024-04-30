import type { TextFieldProps } from '@mui/material';

export const baseTextFieldProps: TextFieldProps = {
  required: true,
  size: 'small',
  fullWidth: true,
  className: 'my-1',
} as const;
