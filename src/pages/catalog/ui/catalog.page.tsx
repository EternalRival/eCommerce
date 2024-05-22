import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import type { GetServerSideProps } from 'next';
import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{ data: number }>;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const a = 1;

  /*   const dehydratedState = createDehydratedState({ queryKey: ['catalog'], queryFn: getPagedQueryResult });

  try {
    const b = await getPagedQueryResult();

    console.log(b);
  } catch (error) {
    console.log(error);
  } */

  return { props: { data: a } };
};

export function CatalogPage({ data }: Props): ReactNode {
  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      <Box
        component="pre"
        className="ring"
      >
        {JSON.stringify(data, null, 2)}
      </Box>
    </>
  );
}
