import Box from '@mui/material/Box';

import { AuthGuard } from '~/features/auth';
import { SignInForm } from '~/widgets/sign-in-form';

export function SignInPage(): JSX.Element {
  return (
    <AuthGuard>
      <Box className="flex grow flex-col items-center justify-center">
        <SignInForm />
      </Box>
    </AuthGuard>
  );
}
