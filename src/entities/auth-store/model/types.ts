export type AuthToken = Nullable<string>;

export type AuthState = { token: AuthToken };

type AuthActions = {
  update: (token: AuthToken) => void;
  delete: () => void;
};

export type AuthStore = AuthState & AuthActions;
