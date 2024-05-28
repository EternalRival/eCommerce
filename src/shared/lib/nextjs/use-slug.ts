import { useRouter } from 'next/router';

export function useSlug(): string[] {
  const {
    query: { slug },
  } = useRouter();

  return typeof slug === 'string' ? [slug] : slug ?? [];
}
