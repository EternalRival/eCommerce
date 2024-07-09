import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PageSpinner } from '~/entities/page-spinner';
import { useUserStore } from '~/entities/user';
import { getCustomerToken, signIn } from '~/features/auth';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { Route } from '~/shared/model/route.enum';
import { ControlledTextField, MuiForm, PasswordTextField } from '~/shared/ui';

import { signInFormDataSchema } from '../model';

import type { JSX } from 'react';
import type { SignInFormData } from '../model';

const defaultValues = {
  email: '',
  password: '',
};

export function SignInForm(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const userStore = useUserStore((store) => store);

  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  const getCustomerTokenMutation = useMutation({
    mutationFn: getCustomerToken,
  });
  const customerSignInMutation = useMutation({
    mutationFn: signIn,
  });

  return (
    <Paper className="p-4">
      <Typography
        component="h1"
        variant="h5"
        className="text-center"
      >
        Sign in
      </Typography>

      <PageSpinner isEnabled={isPending} />

      <MuiForm
        onSubmit={(event) =>
          void handleSubmit(async (formData) => {
            setIsPending(true);

            try {
              const customerToken = await getCustomerTokenMutation.mutateAsync({
                username: formData.email,
                password: formData.password,
              });

              await customerSignInMutation.mutateAsync({
                token: customerToken.access_token,
                variables: { draft: formData },
              });

              userStore.setCustomerToken(customerToken);

              toast.success('Successful sign in');
            } catch (error) {
              toastifyError(error);
            }

            setIsPending(false);
          })(event)
        }
      >
        <Divider className="mt-2">Credentials</Divider>
        <ControlledTextField
          {...createProps('email')}
          fieldProps={{ label: 'E-mail', placeholder: 'user@example.com', autoFocus: true }}
        />
        <PasswordTextField
          {...createProps('password')}
          fieldProps={{ label: 'Password', placeholder: 'aaAA11##' }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="my-2"
          disabled={isPending}
        >
          Submit
        </Button>

        <Box className="text-end">
          <Link
            component={NextLink}
            href={Route.AUTH_SIGN_UP}
            variant="body2"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </Box>
      </MuiForm>
    </Paper>
  );
}
