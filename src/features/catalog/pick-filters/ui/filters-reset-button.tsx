import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { useQuery } from '@tanstack/react-query';

import { ParamKey, getPizzaAttributes } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { toastifyError } from '~/shared/lib/react-toastify';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { useSearchParams } from '~/shared/lib/use-search-params';

import type { JSX } from 'react';

export function FiltersResetButton(): JSX.Element {
  const { searchParams, updateUrl } = useSearchParams();
  const token = useUserStore((store) => store.token.access_token);
  const { data } = useQuery({
    queryKey: [QueryKey.PIZZA_ATTRIBUTES, token],
    queryFn() {
      return getPizzaAttributes({ token });
    },
  });

  return (
    <ListItem>
      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={() => {
          data?.productType?.attributeDefinitions.results.forEach(({ name }) => void searchParams.delete(name));
          [ParamKey.PRICE_MIN, ParamKey.PRICE_MAX].forEach((key) => void searchParams.delete(key));
          updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
        }}
      >
        Reset filters
      </Button>
    </ListItem>
  );
}
