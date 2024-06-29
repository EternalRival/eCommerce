import Box from '@mui/material/Box';

import { AuthGuard } from '~/features/auth';
import { SignUpForm } from '~/widgets/sign-up-form';

export function SignUpPage(): JSX.Element {
  return (
    <AuthGuard>
      <Box className="flex grow flex-col items-center justify-center">
        <SignUpForm />
      </Box>
    </AuthGuard>
  );
}
