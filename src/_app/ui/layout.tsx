import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Header } from '~/widgets/header';

import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

export function Layout({ children }: FCPropsWC): ReactNode {
  return (
    <Stack className="min-h-dvh">
      <Header />
      <Container
        component="main"
        className="flex grow flex-col py-4"
        maxWidth="xl"
      >
        {children}
      </Container>
    </Stack>
  );
}
