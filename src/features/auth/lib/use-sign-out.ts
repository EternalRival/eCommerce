import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { useGetTokenInfoMutation } from '~/entities/auth-token';

export function useSignOut(): { isPending: boolean; signOut: () => Promise<void> } {
  const authStore = useAuthStore((store) => store);
  const getTokenInfoMutation = useGetTokenInfoMutation();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  return {
    isPending,
    async signOut(): Promise<void> {
      setIsPending(true);
      const guestToken = await getTokenInfoMutation.mutateAsync({});
      authStore.setGuestToken(guestToken);
      await queryClient.invalidateQueries();
      setIsPending(false);
    },
  };
}
