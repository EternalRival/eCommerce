import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { StorePreview } from '~/features/store-preview';
import { Header } from '~/widgets/header';

import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

export function Layout({ children }: Props): ReactNode {
  return (
    <>
      <StorePreview />
      <Stack className="min-h-dvh">
        <Header />
        <Container
          component="main"
          className="flex grow flex-col"
        >
          {children}
        </Container>
      </Stack>
    </>
  );
}
