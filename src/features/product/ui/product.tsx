import { useAuthStore } from '~/entities/auth-store';
import { useParseQueryParam } from '~/shared/lib/nextjs';
import { useProductQuery } from '~/entities/product';

import type { ReactNode } from 'react';

export function Product(): ReactNode {
  const token = useAuthStore((store) => store.access_token);
  const { param } = useParseQueryParam('slug');
  const [productSlug] = param;

  const variables = {};

  const productQuery = useProductQuery({
    token,
    variables,
    enabled: !!productSlug,
  });

  return JSON.stringify({ productSlug, data: productQuery.data });
}
