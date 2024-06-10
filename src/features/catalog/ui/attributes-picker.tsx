import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import { useState } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { usePizzaAttributesQuery } from '~/entities/pizza-attributes';
import { toastifyError } from '~/shared/lib/react-toastify';
import { useSearchParams } from '~/shared/lib/use-search-params';

import { PriceSlider } from './price-slider';
import { ParamKey } from '../model';

import type { ReactNode } from 'react';
import type { QueryPizzaAttributesReturn } from '~/entities/pizza-attributes';
import type { FCProps, FCPropsWC } from '~/shared/model/types';

function CollapsibleListItem({
  children,
  label,
  defaultState = true,
}: FCPropsWC<{ label: ReactNode; defaultState?: boolean }>): ReactNode {
  const [isOpen, setIsOpen] = useState(defaultState);

  return (
    <ListItem disablePadding>
      <List
        className="w-full"
        subheader={
          <ListItemButton
            className="pl-4 pr-2"
            onClick={() => void setIsOpen((state) => !state)}
          >
            <ListItemText
              primary={label}
              primaryTypographyProps={{ className: 'text-sm' }}
            />
            <ExpandMoreIcon
              className={clsx('transition-transform', isOpen && 'rotate-180')}
              color="action"
            />
          </ListItemButton>
        }
      >
        <Collapse in={isOpen}>{children}</Collapse>
      </List>
    </ListItem>
  );
}

type Attribute = NonNullable<QueryPizzaAttributesReturn['attributes']>[number];

function AttributeItem({ attribute }: FCProps<{ attribute: Attribute }>): ReactNode {
  const { searchParams, updateUrl } = useSearchParams();

  const isActivated = (key: string): boolean => searchParams.has(attribute.key, key);
  const toggleValue = (key: string): void =>
    void searchParams[isActivated(key) ? 'delete' : 'append'](attribute.key, key);

  const handleChipClick = (key: string): Promise<boolean> => {
    toggleValue(key);

    return updateUrl({ method: 'replace', scroll: false });
  };

  return (
    attribute.values.length > 0 && (
      <CollapsibleListItem label={attribute.label}>
        <Box className="flex flex-wrap gap-2 p-2 pl-4">
          {attribute.values.map(({ key, label }) => (
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
    )
  );
}

function FiltersResetButton(): ReactNode {
  const { searchParams, updateUrl } = useSearchParams();
  const token = useAuthStore((store) => store.access_token);
  const { data } = usePizzaAttributesQuery({ token });

  return (
    <ListItem>
      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={() => {
          data?.attributes?.forEach(({ key }) => void searchParams.delete(key));
          [ParamKey.PRICE_MIN, ParamKey.PRICE_MAX].forEach((key) => void searchParams.delete(key));
          updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
        }}
      >
        Reset filters
      </Button>
    </ListItem>
  );
}

export function AttributesPicker(): ReactNode {
  const token = useAuthStore((store) => store.access_token);

  const { data, isPending, error } = usePizzaAttributesQuery({ token });

  if (isPending) {
    return (
      <Skeleton
        variant="rectangular"
        className="h-12 w-52"
      />
    );
  }

  return (
    <Accordion
      disableGutters
      defaultExpanded
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Attributes</AccordionSummary>
      <AccordionDetails>
        <List
          disablePadding
          dense
        >
          {error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            <>
              <FiltersResetButton />
              {data.prices && (
                <CollapsibleListItem label="Price">
                  <PriceSlider
                    minPrice={data.prices.min}
                    maxPrice={data.prices.max}
                  />
                </CollapsibleListItem>
              )}
              {data.attributes?.map((attribute) => (
                <AttributeItem
                  key={attribute.key}
                  attribute={attribute}
                />
              ))}
            </>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
