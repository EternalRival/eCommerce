import { render } from '@testing-library/react';

import { UserStoreProvider } from '~/entities/user';
import { QueryProvider } from '~/shared/lib/tanstack-query';

import { ProfilePage } from './profile.page';

describe('product.page', () => {
  it('renders w/o errors', () => {
    expect(() =>
      render(
        <QueryProvider>
          <UserStoreProvider>
            <ProfilePage />
          </UserStoreProvider>
        </QueryProvider>
      )
    ).not.toThrow();
  });
});
