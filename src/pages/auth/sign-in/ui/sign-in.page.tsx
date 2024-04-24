import { SignInForm } from '@/features/sign-in-form';

import type { ReactNode } from 'react';

export function SignInPage(): ReactNode {
  return (
    <>
      <h1>Sign-in Page</h1>
      <SignInForm />
    </>
  );
}
