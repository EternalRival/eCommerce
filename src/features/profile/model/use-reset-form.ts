import { useEffect } from 'react';

export function useResetForm({ shouldReset, reset }: { shouldReset: boolean; reset: () => void }): void {
  useEffect(() => {
    if (shouldReset) {
      reset();
    }
  }, [reset, shouldReset]);
}
