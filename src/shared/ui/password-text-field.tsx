import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

import { ControlledTextField } from './controlled-text-field';

import type { TextFieldProps } from '@mui/material/TextField';
import type { JSX } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

type PasswordTextFieldProps<T extends FieldValues> = Readonly<{
  control: Control<T>;
  name: Path<T>;
  fieldProps?: Omit<TextFieldProps, 'name'>;
}>;

export function PasswordTextField<T extends FieldValues>({
  control,
  name,
  fieldProps,
}: PasswordTextFieldProps<T>): JSX.Element {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ControlledTextField
      control={control}
      name={name}
      fieldProps={{
        ...fieldProps,
        type: hidePassword ? 'password' : 'text',
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => void setHidePassword((v) => !v)}
                onMouseDown={(event) => void event.preventDefault()}
                onMouseUp={(event) => void event.preventDefault()}
                edge="end"
              >
                {hidePassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
