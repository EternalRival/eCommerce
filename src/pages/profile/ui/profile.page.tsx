import Typography from '@mui/material/Typography';

import { AuthGuard } from '~/features/auth';
import { Profile } from '~/features/profile';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';

export function ProfilePage(): ReactNode {
  return (
    <AuthGuard
      shouldBeSignedIn
      redirectTo={Route.AUTH_SIGN_IN}
    >
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Profile Page
      </Typography>

      <Profile />
    </AuthGuard>
  );
}
