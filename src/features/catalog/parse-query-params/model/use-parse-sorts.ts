import { ParamKey, createSorts } from '~/entities/products';
import { useSearchParams } from '~/shared/lib/use-search-params';

export function useParseSorts(): { sorts: string[] } {
  const { searchParams } = useSearchParams();

  return { sorts: createSorts(searchParams.getAll(ParamKey.SORT)) };
}
