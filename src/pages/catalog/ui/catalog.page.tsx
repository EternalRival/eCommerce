import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CategoryBreadcrumbs } from '~/features/catalog/category-breadcrumbs';
import { CategoryPicker } from '~/features/catalog/pick-category';
import { FiltersPicker } from '~/features/catalog/pick-filters';
import { ProductList } from '~/widgets/product-list';

import { usePruneInvalidCategoriesFromUrl } from '../model';

export function CatalogPage(): JSX.Element {
  usePruneInvalidCategoriesFromUrl();

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        className="py-2"
      >
        Catalog Page
      </Typography>

      <CategoryBreadcrumbs />

      <Stack className="gap-4 md:flex-row">
        <Stack className="shrink-0 md:w-[max(18rem,25%)]">
          <CategoryPicker />
          <FiltersPicker />
        </Stack>

        <ProductList />
      </Stack>
    </>
  );
}
