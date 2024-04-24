import type { ReactNode } from 'react';

export function SignInForm(): ReactNode {
  return (
    <form>
      <input
        type="text"
        placeholder="login"
      />
      <input
        type="password"
        placeholder="password"
      />
    </form>
  );
}
