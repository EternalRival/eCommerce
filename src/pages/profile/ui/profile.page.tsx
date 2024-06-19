import Typography from '@mui/material/Typography';

import { Profile } from '~/features/profile';

import type { ReactNode } from 'react';

export function ProfilePage(): ReactNode {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Profile Page
      </Typography>

      <Profile />
    </>
  );
}
