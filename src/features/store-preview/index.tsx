import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';

import type { ReactNode } from 'react';

export function StorePreview(): ReactNode {
  const authStore = useAuthStore((s) => s);
  const customerStore = useCustomerStore((s) => s);

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 overflow-scroll text-xs">
      <pre>{JSON.stringify(authStore)}</pre>
      <pre>{JSON.stringify(customerStore)}</pre>
    </div>
  );
}
