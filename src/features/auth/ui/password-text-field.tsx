import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

import { ControlledTextField } from './controlled-text-field';

import type { ReactNode } from 'react';
import type { ControlledTextFieldProps } from '../model';

export function PasswordTextField<T extends Dict<unknown>>({
  textFieldProps,
  ...props
}: ControlledTextFieldProps<T>): ReactNode {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ControlledTextField
      {...props}
      textFieldProps={{
        ...textFieldProps,
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
