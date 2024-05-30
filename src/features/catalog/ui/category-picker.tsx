import { Accordion, AccordionDetails, AccordionSummary, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Route } from '~/shared/model/route.enum';

import type { ReactNode } from 'react';
import type { Category } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  categories: Category[];
  isPending?: boolean;
}>;

function CategoryItem({
  category,
  endpoint,
  paddingLeft = 0,
}: FCProps<{
  category: Category;
  endpoint: string;
  paddingLeft?: number;
}>): ReactNode {
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

export function CategoryPicker({ isPending, categories }: Props): ReactNode {
  if (isPending) {
    return 'pending...';
  }

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Categories</AccordionSummary>
      <AccordionDetails>
        <List
          disablePadding
          dense
        >
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              endpoint={Route.CATALOG}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
