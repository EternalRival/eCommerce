import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

import type { SnackbarCloseReason } from '@mui/material';
import type { ReactNode, SyntheticEvent } from 'react';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{ errorMessage?: string; clearErrorMessage: () => void }>;

export function RootErrorAlert({ errorMessage, clearErrorMessage }: Props): ReactNode {
  const handleClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason): void => {
    if (reason !== 'clickaway') {
      clearErrorMessage();
    }
  };

  return (
    errorMessage && (
      <Snackbar
        TransitionComponent={Slide}
        open={Boolean(errorMessage)}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert
          severity="error"
          onClose={handleClose}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    )
  );
}
