import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

import type { LinkProps } from 'next/link';
import type { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<Pick<LinkProps, 'href'>>;

export function ChangeFormLink({ href, children }: Props): ReactNode {
  return (
    <Box className="text-right">
      <Link
        component={NextLink}
        href={href}
        variant="body2"
      >
        {children}
      </Link>
    </Box>
  );
}
