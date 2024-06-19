import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import type { ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

type Props = FCPropsWC<{ isPending: boolean; isDisabled?: boolean }>;

export function SubmitButton({ isPending, isDisabled }: Props): ReactNode {
  return (
    <Button
      fullWidth
      variant="contained"
      type="submit"
      disabled={isPending || isDisabled}
      className="my-2"
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
