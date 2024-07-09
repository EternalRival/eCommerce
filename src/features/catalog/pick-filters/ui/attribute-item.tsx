import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { toastifyError } from '~/shared/lib/react-toastify';
import { useSearchParams } from '~/shared/lib/use-search-params';
import { CollapsibleListItem } from '~/shared/ui/collapsible-list-item';

import type { JSX } from 'react';
import type { GetPizzaAttributesReturn } from '~/entities/products';

type AttributeItemProps = Readonly<{
  pizzaAttribute: NonNullable<GetPizzaAttributesReturn['productType']>['attributeDefinitions']['results'][number];
}>;

export function AttributeItem({ pizzaAttribute }: AttributeItemProps): Nullable<JSX.Element> {
  const { searchParams, updateUrl } = useSearchParams();

  const isActivated = (key: string): boolean => searchParams.has(pizzaAttribute.name, key);
  const toggleValue = (key: string): void =>
    void searchParams[isActivated(key) ? 'delete' : 'append'](pizzaAttribute.name, key);

  const handleChipClick = (key: string): Promise<boolean> => {
    toggleValue(key);

    return updateUrl({ method: 'replace', scroll: false });
  };

  return pizzaAttribute.type.values.total < 1 ? null : (
    <CollapsibleListItem label={pizzaAttribute.label}>
      <Box className="flex flex-wrap gap-2 p-2 pl-4">
        {pizzaAttribute.type.values.results.map(({ key, label }) => (
          <Chip
            key={key}
            color="primary"
            label={label}
            variant={isActivated(key) ? 'filled' : 'outlined'}
            onClick={() => {
              handleChipClick(key).catch(toastifyError);
            }}
          />
        ))}
      </Box>
    </CollapsibleListItem>
  );
}
