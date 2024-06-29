import type { TokenSliceState } from './token-slice-state.schema';

export type State = { token: TokenSliceState };

export type Actions = {
  setGuestToken: (token: Pick<State['token'], 'access_token'>) => void;
  setCustomerToken: (token: Pick<State['token'], 'access_token' | 'refresh_token'>) => void;
};

export type Store = State & Actions;

export type AuthStateByType<T extends State['token']['type']> = Extract<State, { token: { type: T } }>;
