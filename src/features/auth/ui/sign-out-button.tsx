import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';

import type { ReactNode } from 'react';

export function SignOutButton(): ReactNode {
  const authStore = useAuthStore((store) => store);
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        authStore.reset();
        // authStore.init().catch(toastifyError); // ? переписать под ТЗ
        router.reload(); // ? переписать под ТЗ
      }}
    >
      Sign out
    </Button>
  );
}
