import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
      <Stack className="self-start">123</Stack>
    </>
  );
}
