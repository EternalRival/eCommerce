import { useEffect } from 'react';

import { toastifyError } from '../react-toastify';

import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export function useRevalidateFactory<T extends FieldValues>({
  watch,
  trigger,
  getFieldState,
}: Pick<UseFormReturn<T>, 'watch' | 'trigger' | 'getFieldState'>) {
  function revalidateIfDirty(e: Path<T>): void {
    if (getFieldState(e).isDirty) {
      trigger(e).catch(toastifyError);
    }
  }

  return function useRevalidate(publisher: Path<T>, ...subscribers: Path<T>[]): void {
    const pubValue = watch(publisher);

    useEffect(() => {
      subscribers.forEach(revalidateIfDirty);
    }, [pubValue, subscribers]);
  };
}
