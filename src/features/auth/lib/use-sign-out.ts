import { useRouter } from 'next/router';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';

export function useSignOut(): { isReady: boolean; signOut: () => void } {
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);
  const router = useRouter();

  return {
    isReady: router.isReady,
    signOut(): void {
      customerStore.reset();
      authStore.reset(); // ? переписать под ТЗ
    },
  };
}
