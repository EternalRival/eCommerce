import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { Logo } from './logo';
import { NavMenu } from './nav-menu';

export function Header(): JSX.Element {
  return (
    <AppBar className="sticky">
      <Container className="max-w-screen-2xl">
        <Toolbar
          disableGutters
          className="justify-between"
        >
          <Box>
            <Logo />
          </Box>
          <Box>
            <NavMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
