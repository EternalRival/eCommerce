import { Stack } from '@mui/material';

import type { ReactNode } from 'react';
import type { QueryProductTypesReturn } from '~/shared/api/commercetools';
import type { FCProps } from '~/shared/model/types';

type Props = FCProps<{
  placeholder?: string;
  isPending?: boolean;
  productTypesReturn?: Nullable<QueryProductTypesReturn>;
}>;

export function Filters({ isPending, productTypesReturn, placeholder = 'Filters' }: Props): ReactNode {
  // price range, brand, color, size
  /* 
  - colorlabel
  - finishlabel
  - size
  - color-filter
  */
  // items with color, fabric, size, finish and/or product spec attributes
  if (isPending) {
    return 'pending...';
  }

  return (
    <Stack className="ring">
      {placeholder}
      <>{JSON.stringify(productTypesReturn?.results)}</>
    </Stack>
  );
}

/** 
Categories
├── Home Decor
│   ├── Bedding
│   └── Room Decor
│       ├── Home Accents
│       └── Rugs
├── Furniture
│   ├── Collections
│   │   ├── The Minimalist
│   │   ├── The Modernist
│   │   └── The Traditionalist
│   ├── Living Room Furniture
│   │   ├── Tables
│   │   ├── Sofas
│   │   └── Chairs
│   └── Bedroom Furniture
│       ├── Dressers
│       └── Beds
├── Kitchen
│   ├── Dinnerware
│   │   ├── Bakeware 
│   │   ├── Bowls 
│   │   └── Plates 
│   ├── Bar and Glassware 
│   │   ├── Glassware 
│   │   └── Bar Accessories 
│   └── Kitchen Collections 
│       ├── Serving Platters 
│       └── Cheese Trays 
└── New Arrivals
*/
