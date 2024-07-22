import { render } from '@testing-library/react';

import { NotFoundPage } from './not-found.page';

describe('not-found.page', () => {
  it('renders w/o errors', () => {
    expect(() => render(<NotFoundPage />)).not.toThrow();
  });
});
