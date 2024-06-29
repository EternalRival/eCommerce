import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';

type PageSpinnerProps = Readonly<{
  isEnabled?: boolean;
}>;

export function PageSpinner({ isEnabled }: PageSpinnerProps): Nullable<JSX.Element> {
  const open = isEnabled ?? true;

  return (
    <Modal open={open}>
      <Backdrop
        open={open}
        sx={{ backdropFilter: 'blur(.25rem)', background: 'transparent' }}
      >
        <CircularProgress />
      </Backdrop>
    </Modal>
  );
}
