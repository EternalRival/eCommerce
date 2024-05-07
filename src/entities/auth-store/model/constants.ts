import type { AuthState } from './types';

export const INITIAL_STATE: AuthState = {
  access_token: null,
  refresh_token: null,
  expires_in: null,
};
