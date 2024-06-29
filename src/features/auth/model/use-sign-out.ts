import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useUserStore } from '~/entities/user';

import { getGuestToken } from '../api';

type UseSignOutProps = {
  isPending: boolean;
  signOut: () => Promise<void>;
};

export function useSignOut(): UseSignOutProps {
  const [isPending, setIsPending] = useState(false);

  const getGuestTokenMutation = useMutation({ mutationFn: getGuestToken });

  const userStore = useUserStore((store) => store);

  const queryClient = useQueryClient();

  return {
    isPending,
    async signOut(): Promise<void> {
      setIsPending(true);

      const guestToken = await getGuestTokenMutation.mutateAsync();

      userStore.setGuestToken(guestToken);

      await queryClient.invalidateQueries();

      setIsPending(false);
    },
  };
}
