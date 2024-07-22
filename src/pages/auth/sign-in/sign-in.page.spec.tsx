import { render } from '@testing-library/react';

import { UserStoreProvider } from '~/entities/user';

import { SignInPage } from './sign-in.page';

describe('sign-in.page', () => {
  it('renders w/o errors', () => {
    expect(() =>
      render(
        <UserStoreProvider>
          <SignInPage />
        </UserStoreProvider>
      )
    ).not.toThrow();
  });
});
