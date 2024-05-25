import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

import type { ReactNode } from 'react';
import type { QueryCategoriesReturn } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Category = QueryCategoriesReturn['results'][number];

type Props = FCProps<{ baseEndpoint: string; categoriesBreadcrumbsProps: Category[] }>;

export function CategoriesBreadcrumbs({ baseEndpoint, categoriesBreadcrumbsProps }: Props): ReactNode {
  let lastUrl = baseEndpoint;

  return (
    <Breadcrumbs>
      {categoriesBreadcrumbsProps.map((props) => {
        lastUrl += `/${props.slug ?? ''}`;

        return (
          <Link
            key={props.id}
            component={NextLink}
            href={lastUrl}
          >
            {props.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
