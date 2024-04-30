import type { TextFieldProps } from '@mui/material';

export type InputsData<T extends Dict<unknown>> = {
  props: Record<keyof T, TextFieldProps>;
  defaultValues: T;
};
