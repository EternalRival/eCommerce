import type { ReactNode } from 'react';
import type { QueryCategoriesReturn } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  isPending?: boolean;
  categoriesReturn?: QueryCategoriesReturn;
}>;

export function CategoryPicker({ isPending, categoriesReturn }: Props): ReactNode {
  const categories = categoriesReturn?.results;

  if (isPending) {
    return 'pending...';
  }

  return <div>{JSON.stringify(categories, null, 2)}</div>;
}
