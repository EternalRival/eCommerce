import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, ms: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => void setDebouncedValue(value), ms);

    return (): void => void clearInterval(timer);
  }, [ms, value]);

  return debouncedValue;
}
