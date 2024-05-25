import { Stack } from '@mui/material';

import type { ReactNode } from 'react';

type Props = Readonly<{ placeholder?: string }>;

export function Filters({ placeholder = '123' }: Props): ReactNode {
  // price range, brand, color, size
  /* 
  - colorlabel
  - finishlabel
  - size
  - color-filter
  */
  // items with color, fabric, size, finish and/or product spec attributes
  return <Stack className="ring">{placeholder}</Stack>;
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
