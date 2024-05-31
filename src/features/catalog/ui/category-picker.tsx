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
import type { Category } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

function CategoryItem({
  category,
  endpoint,
  paddingLeft = 2,
}: FCProps<{
  category: Category;
  endpoint: string;
  paddingLeft?: number;
}>): ReactNode {
  const router = useRouter();

  if (!category.slug) {
    return null;
  }

  const paddingStep = 2;
  const buttonEndpoint = `${endpoint}/${category.slug}`;

  return (
    <>
      <ListItemButton
        LinkComponent={Link}
        sx={{ paddingLeft }}
        href={buttonEndpoint}
        selected={router.asPath.split('?')[0] === buttonEndpoint}
      >
        <ListItemText primary={category.name} />
      </ListItemButton>
      {category.children.map((child) => (
        <CategoryItem
          key={child.id}
          category={child}
          endpoint={buttonEndpoint}
          paddingLeft={paddingLeft + paddingStep}
        />
      ))}
    </>
  );
}

export function CategoryPicker(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const { data: categories, isPending, error } = useCategoriesQuery({ token });

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
            endpoint=""
          />
          {error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                endpoint={Route.CATALOG}
              />
            ))
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
