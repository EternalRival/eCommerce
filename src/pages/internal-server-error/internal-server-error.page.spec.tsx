import { render } from '@testing-library/react';

import { InternalServerErrorPage } from './internal-server-error.page';

describe('internal-server-error.page', () => {
  it('renders w/o errors', () => {
    expect(() => render(<InternalServerErrorPage />)).not.toThrow();
  });
});
