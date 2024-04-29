import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { baseTextFieldProps } from '../model/base-text-field-props';

import type { TextFieldProps } from '../model/base-text-field-props';
import type { ReactNode } from 'react';

export function PasswordTextField({ errorText, registerProps }: TextFieldProps): ReactNode {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <TextField
      {...baseTextFieldProps}
      {...registerProps}
      label="Password"
      placeholder="aaAA11##"
      error={Boolean(errorText)}
      helperText={errorText ?? ' '}
      type={hidePassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => void setHidePassword((v) => !v)}
              onMouseDown={(event) => void event.preventDefault()}
              edge="end"
            >
              {hidePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
