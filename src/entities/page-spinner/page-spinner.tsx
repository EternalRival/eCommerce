import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import type { ReactNode } from 'react';

export function PageSpinner(): ReactNode {
  return (
    <Backdrop
      open
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      className="bg-transparent backdrop-blur-sm"
    >
      <CircularProgress />
    </Backdrop>
  );
}
