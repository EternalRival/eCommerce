import Button from '@mui/material/Button';

import type { ComponentProps, ReactNode } from 'react';
import type { FCPropsWC } from '~/shared/model/types';

export function HeaderButton({ children, ...props }: FCPropsWC<ComponentProps<typeof Button>>): ReactNode {
  return (
    <Button
      color="inherit"
      {...props}
    >
      {children}
    </Button>
  );
}
