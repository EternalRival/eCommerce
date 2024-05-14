import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { Route } from '~/shared/model/route.enum';

export function useSignOut(): () => Promise<void> {
  const authStore = useAuthStore((store) => store);
  const router = useRouter();

  return async () => {
    authStore.reset();
    await authStore.init(); // ? переписать под ТЗ
    await router.replace(Route.ROOT); // ? переписать под ТЗ
  };
}
