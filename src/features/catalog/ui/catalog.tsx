import Stack from '@mui/material/Stack';
import NextLink from 'next/link';

import { Route } from '~/shared/model/route.enum';

import { useProductProjectionSearchQuery } from '../lib';
import { ProductCardList } from './product-card-list';

import type { ReactNode } from 'react';
import type { QueryProductProjectionSearchVariables } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

function TemporaryCategoriesPreview(): ReactNode {
  return (
    <ul>
      <li key="/classic">
        <NextLink href={`${Route.CATALOG}/classic`}>/classic</NextLink>
        <ul>
          {['/classic/meat-pizza', '/classic/fish-and-seafood-pizza', '/classic/vegetarian-pizza'].map((url) => (
            <li key={url}>
              <NextLink href={Route.CATALOG + url}>{url.replace('/classic', '')}</NextLink>
            </li>
          ))}
        </ul>
      </li>
      <li key="/premium">
        <NextLink href={`${Route.CATALOG}/premium`}>/premium</NextLink>
        <ul>
          {['/premium/gourmet-with-meat-delicacies', '/premium/with-exotic-seafood', '/premium/elite-vegetarian'].map(
            (url) => (
              <li key={url}>
                <NextLink href={Route.CATALOG + url}>{url.replace('/premium', '')}</NextLink>
              </li>
            )
          )}
        </ul>
      </li>
      <li key="/kids">
        <NextLink href={`${Route.CATALOG}/kids`}>/kids</NextLink>
        <ul>
          {['/kids/with-soft-cheeses', '/kids/with-fruit'].map((url) => (
            <li key={url}>
              <NextLink href={Route.CATALOG + url}>{url.replace('/kids', '')}</NextLink>
            </li>
          ))}
        </ul>
      </li>
      <li key="/dietary">
        <NextLink href={`${Route.CATALOG}/dietary`}>/dietary</NextLink>
        <ul>
          {['/dietary/low-in-calories', '/dietary/gluten-free'].map((url) => (
            <li key={url}>
              <NextLink href={Route.CATALOG + url}>{url.replace('/dietary', '')}</NextLink>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

type Props = FCProps<{
  productProjectionSearchQueryVariables: QueryProductProjectionSearchVariables;
}>;

export function Catalog({ productProjectionSearchQueryVariables }: Props): ReactNode {
  const catalogQuery = useProductProjectionSearchQuery(productProjectionSearchQueryVariables);

  /*   const productTypesQuery = useQuery({
    queryKey: [QueryKey.PRODUCT_TYPES, token],
    queryFn() {
      return queryProductTypes(token);
    },
    throwOnError: true,
  }); */

  return (
    <Stack direction="row">
      {/* <Filters
        isPending={productTypesQuery.isPending}
        productTypesReturn={productTypesQuery.data}
      /> */}

      {/* <CategoryPicker
        isPending={categoryQuery.isPending}
        categoriesReturn={categoryQuery.data}
      /> */}
      <TemporaryCategoriesPreview />

      <ProductCardList
        isPending={catalogQuery.isPending}
        productProjectionSearchResult={catalogQuery.data}
      />
    </Stack>
  );
}
