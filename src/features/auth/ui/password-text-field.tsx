import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

import { ControlledTextField } from './controlled-text-field';

import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { FCProps } from '~/shared/model/types';

type Props<T extends FieldValues> = FCProps<{
  control: Control<T>;
  name: Path<T>;
  fieldProps?: Omit<TextFieldProps, 'name'>;
}>;

export function PasswordTextField<T extends FieldValues>({ control, name, fieldProps }: Props<T>): ReactNode {
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
