import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

import type { ReactNode } from 'react';

export function PageSpinner(): ReactNode {
  return (
    <Modal open>
      <Backdrop
        open
        sx={{ backdropFilter: 'blur(.25rem)', background: 'transparent' }}
      >
        <CircularProgress />
      </Backdrop>
    </Modal>
  );
}
