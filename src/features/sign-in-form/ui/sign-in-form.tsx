import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

import type { ReactNode } from 'react';

export function SignInForm(): ReactNode {
  const { register, handleSubmit } = useForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((/* data */) => {
        /* void console.log(JSON.stringify(data)) */
      })}
      autoComplete="off"
      noValidate
      className=""
    >
      <TextField
        margin="normal"
        fullWidth
        label="Login"
        required
        {...register('login')}
        placeholder="Oleg"
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        required
        {...register('password')}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        className="mb-4 mt-6"
      >
        Submit
      </Button>
    </Box>
  );
}
