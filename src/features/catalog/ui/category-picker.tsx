import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { useCategoriesQuery } from '~/entities/categories';
import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { QueryCategoriesReturn } from '~/entities/categories';
import type { FCProps } from '~/shared/model/types';

type Category = QueryCategoriesReturn['categories'][number];

function CategoryItem({
  category,
  getCount,
  endpoint,
  paddingLeft = 2,
}: FCProps<{
  category: Category;
  getCount: (id: string) => Nullable<string>;
  endpoint: string;
  paddingLeft?: number;
}>): ReactNode {
  const { asPath } = useRouter();

  if (!category.slug || !category.name) {
    return null;
  }

  const { id, slug, name, children } = category;

  const paddingStep = 2;
  const buttonEndpoint = `${endpoint}/${slug}`;
  const count = getCount(id);

  return (
    <>
      <ListItemButton
        LinkComponent={Link}
        sx={{ paddingLeft }}
        href={buttonEndpoint}
        selected={asPath.split('?')[0] === buttonEndpoint}
      >
        <ListItemText primary={count === null ? name : `${name} (${count})`} />
      </ListItemButton>
      {children.map((child) => (
        <CategoryItem
          key={child.id}
          category={child}
          getCount={getCount}
          endpoint={buttonEndpoint}
          paddingLeft={paddingLeft + paddingStep}
        />
      ))}
    </>
  );
}

export function CategoryPicker(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const { data, isPending, error } = useCategoriesQuery({ token });

  if (isPending) {
    return (
      <Skeleton
        variant="rectangular"
        className="h-12 w-52"
      />
    );
  }

  const rootCategory = { id: 'root', slug: Route.CATALOG.slice(1), name: 'All', children: [] };

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
            getCount={() =>
              data?.categoriesFacet.reduce((acc, { productCount }) => acc + (productCount ?? 0), 0).toString() ?? null
            }
            endpoint=""
          />
          {error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            data.categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                getCount={(id) =>
                  data.categoriesFacet.find(({ term }) => term === id)?.productCount?.toString() ?? null
                }
                endpoint={Route.CATALOG}
              />
            ))
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
