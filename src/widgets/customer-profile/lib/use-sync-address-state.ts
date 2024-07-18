import { useEffect } from 'react';

import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type BooleanField<T extends FieldValues> = { [K in Path<T>]: T[K] extends boolean ? K : never }[Path<T>];

export function useSyncAddressStateFactory<T extends FieldValues>({
  setValue,
  watch,
}: Pick<UseFormReturn<T>, 'watch' | 'setValue'>) {
  return function useSyncAddressState(field: BooleanField<T>, defaultField: BooleanField<T>): void {
    const value = watch(field);
    const defaultValue = watch(defaultField);

    useEffect(() => {
      if (defaultValue) {
        setValue(field, defaultValue);
      }
    }, [defaultValue, field]);

    useEffect(() => {
      if (!value) {
        setValue(defaultField, value);
      }
    }, [defaultField, value]);
  };
}
