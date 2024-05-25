import { CatalogPage } from '~/pages/catalog';

import type { CatalogPageProps } from '~/pages/catalog';
import type { GetServerSideProps } from 'next';

type Params = { slug: string[] };

export const getServerSideProps: GetServerSideProps<CatalogPageProps, Params> = async ({ params }) => ({
  props: {
    slug: params?.slug ?? [],
  },
});

export default CatalogPage;
