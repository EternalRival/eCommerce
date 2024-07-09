import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { JSX } from 'react';
import type { Category } from '~/entities/products';

export function CategoryItem({
  category,
  getCount,
  endpoint,
  paddingLeft = 2,
}: Readonly<{
  category: Category;
  getCount: (id: string) => Maybe<string>;
  endpoint: string;
  paddingLeft?: number;
}>): Nullable<JSX.Element> {
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
        <ListItemText primary={typeof count === 'string' ? `${name} (${count})` : name} />
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
