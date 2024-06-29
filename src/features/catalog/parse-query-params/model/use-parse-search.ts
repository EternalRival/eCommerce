import { ParamKey, createSearch } from '~/entities/products';
import { useSearchParams } from '~/shared/lib/use-search-params';

export function useParseSearch(): string {
  const { searchParams } = useSearchParams();

  return createSearch(searchParams.get(ParamKey.SEARCH));
}
