import { render } from '@testing-library/react';

import { UserStoreProvider } from '~/entities/user';

import { SignUpPage } from './sign-up.page';

describe('sign-up.page', () => {
  it('renders w/o errors', () => {
    expect(() =>
      render(
        <UserStoreProvider>
          <SignUpPage />
        </UserStoreProvider>
      )
    ).not.toThrow();
  });
});
