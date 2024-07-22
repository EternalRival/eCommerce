import { render } from '@testing-library/react';

import { UserStoreProvider } from '~/entities/user';
import { QueryProvider } from '~/shared/lib/tanstack-query';

import { ProductPage } from './product.page';

describe('product.page', () => {
  it('renders w/o errors', () => {
    expect(() =>
      render(
        <QueryProvider>
          <UserStoreProvider>
            <ProductPage />
          </UserStoreProvider>
        </QueryProvider>
      )
    ).not.toThrow();
  });
});
