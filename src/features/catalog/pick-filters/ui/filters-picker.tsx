import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';

import { PriceSlider, SearchInput, getPizzaAttributes } from '~/entities/products';
import { useUserStore } from '~/entities/user';
import { QueryKey } from '~/shared/lib/tanstack-query';
import { CollapsibleListItem } from '~/shared/ui';

import { FiltersResetButton } from './filters-reset-button';
import { AttributeItem } from './attribute-item';

import type { JSX } from 'react';

export function FiltersPicker(): JSX.Element {
  const token = useUserStore((store) => store.token.access_token);

  const getPizzaAttributesQuery = useQuery({
    queryKey: [QueryKey.PIZZA_ATTRIBUTES, token],
    queryFn() {
      return getPizzaAttributes({ token });
    },
  });

  if (getPizzaAttributesQuery.isPending) {
    return (
      <Skeleton
        variant="rectangular"
        className="h-12 w-52"
      />
    );
  }

  const attributes = getPizzaAttributesQuery.data?.productType?.attributeDefinitions.results;

  const prices = getPizzaAttributesQuery.data?.productProjectionSearch.facets
    .find(({ facet }) => facet === 'prices')
    ?.value.ranges.find(Boolean);

  return (
    <Accordion
      disableGutters
      defaultExpanded
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filters</AccordionSummary>
      <AccordionDetails>
        <List
          disablePadding
          dense
        >
          {getPizzaAttributesQuery.error ? (
            <Alert severity="error">{getPizzaAttributesQuery.error.message}</Alert>
          ) : (
            <>
              <SearchInput />
              <FiltersResetButton />
              {prices && (
                <CollapsibleListItem label="Price">
                  <PriceSlider
                    minPrice={prices.min}
                    maxPrice={prices.max}
                  />
                </CollapsibleListItem>
              )}
              {attributes?.map((attribute) => (
                <AttributeItem
                  key={attribute.name}
                  pizzaAttribute={attribute}
                />
              ))}
            </>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
