import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

import { mswServer } from './msw-server';

beforeAll(() => {
  loadEnvConfig(process.cwd());
  mswServer.listen();
});

beforeEach(() => {
  vi.mock('next/router', () => import('next-router-mock'));
});

afterEach(() => {
  vi.resetAllMocks();
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
