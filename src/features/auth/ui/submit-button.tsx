import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

type Props = FCPropsWC<{ isPending: boolean }>;

export function SubmitButton({ isPending }: Props): ReactNode {
  return (
    <Button
      fullWidth
      variant="contained"
      type="submit"
      disabled={isPending}
      className="my-4"
    >
      Submit
      {isPending && (
        <CircularProgress
          size={24}
          className="absolute inset-auto"
        />
      )}
    </Button>
  );
}
