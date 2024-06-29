import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Header } from '~/widgets/header';

import type { PropsWithChildren } from 'react';

type LayoutProps = Readonly<PropsWithChildren>;

export function Layout({ children }: LayoutProps): JSX.Element {
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
