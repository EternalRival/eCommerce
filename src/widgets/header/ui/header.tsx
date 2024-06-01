import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import { NavMenu } from './nav-menu';
import { ProfileButtons } from './profile-buttons';

import type { ReactNode } from 'react';

export function Header(): ReactNode {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className="grow">
            <Link
              component={NextLink}
              href={Route.ROOT}
              variant="button"
              underline="none"
              color="inherit"
            >
              ER-Shop
            </Link>
          </Box>
          <NavMenu />
          <ProfileButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
