export type AuthToken = Nullable<string>;
export type RefreshToken = Nullable<string>;
export type ExpiresIn = Nullable<number>;

export type AuthState = {
  access_token: AuthToken;
  refresh_token: RefreshToken;
  expires_in: ExpiresIn;
};

type AuthActions = {
  update: (state: Partial<AuthState>) => void;
  delete: () => void;
};

export type AuthStore = AuthState & AuthActions;
