import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';

import { getCategories } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { Route } from '~/shared/model/route.enum';

import { CategoryItem } from './category-item';

export function CategoryPicker(): JSX.Element {
  const token = useUserStore((store) => store.token.access_token);

  const getCategoriesQuery = useQuery({
    queryKey: [QueryKey.CATEGORIES, token],
    queryFn() {
      return getCategories({ token });
    },
  });

  if (getCategoriesQuery.isPending) {
    return (
      <Skeleton
        variant="rectangular"
        className="h-12 w-52"
      />
    );
  }

  const rootCategory = { id: 'root', slug: Route.CATALOG.slice(1), name: 'All', children: [] };

  const categoriesFacet = getCategoriesQuery.data?.productProjectionSearch.facets.find(
    ({ facet }) => facet === 'categories'
  )?.value.terms;

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Categories</AccordionSummary>
      <AccordionDetails>
        <List
          disablePadding
          dense
        >
          <CategoryItem
            key={rootCategory.id}
            category={rootCategory}
            getCount={() => categoriesFacet?.reduce((acc, { productCount }) => acc + (productCount ?? 0), 0).toString()}
            endpoint=""
          />
          {getCategoriesQuery.error ? (
            <Alert severity="error">{getCategoriesQuery.error.message}</Alert>
          ) : (
            getCategoriesQuery.data.categories.results.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                getCount={(id) => categoriesFacet?.find(({ term }) => term === id)?.productCount?.toString()}
                endpoint={Route.CATALOG}
              />
            ))
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
