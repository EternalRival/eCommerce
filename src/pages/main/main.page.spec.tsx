import { render } from '@testing-library/react';

import { MainPage } from './main.page';

describe('main.page', () => {
  it('renders w/o errors', () => {
    expect(() => render(<MainPage />)).not.toThrow();
  });
});
