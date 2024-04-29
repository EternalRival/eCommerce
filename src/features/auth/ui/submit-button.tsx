import Button from '@mui/material/Button';

import type { ReactNode } from 'react';

export function SubmitButton(): ReactNode {
  return (
    <Button
      fullWidth
      variant="contained"
      type="submit"
      className="my-4"
    >
      Submit
    </Button>
  );
}
