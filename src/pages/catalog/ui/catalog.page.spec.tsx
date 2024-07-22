import { render } from '@testing-library/react';

import { UserStoreProvider } from '~/entities/user';
import { QueryProvider } from '~/shared/lib/tanstack-query';

import { CatalogPage } from './catalog.page';

describe('catalog.page', () => {
  it('renders w/o errors', () => {
    expect(() =>
      render(
        <QueryProvider>
          <UserStoreProvider>
            <CatalogPage />
          </UserStoreProvider>
        </QueryProvider>
      )
    ).not.toThrow();
  });
});
