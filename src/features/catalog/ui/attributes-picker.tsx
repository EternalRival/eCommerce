import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useState } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { usePizzaAttributesQuery } from '~/entities/pizza-attributes';
import { clampValue } from '~/shared/lib/clamp-value';
import { toastifyError } from '~/shared/lib/react-toastify';
import { useSearchParams } from '~/shared/lib/use-search-params';

import type { FC, ReactNode } from 'react';
import type { QueryPizzaAttributesReturn } from '~/entities/pizza-attributes';
import type { FCProps } from '~/shared/model/types';

function useSubListButton(defaultState = true): { isOpen: boolean; Button: FC<{ label: ReactNode }> } {
  const [isOpen, setIsOpen] = useState(defaultState);

  return {
    isOpen,
    Button: ({ label }) => (
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
    ),
  };
}

type Attribute = NonNullable<QueryPizzaAttributesReturn['attributes']>[number];

function AttributeItem({ attribute }: FCProps<{ attribute: Attribute }>): ReactNode {
  const { isOpen, Button: SublistButton } = useSubListButton();

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
      <ListItem disablePadding>
        <List
          className="w-full"
          subheader={<SublistButton label={attribute.label} />}
        >
          <Collapse in={isOpen}>
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
          </Collapse>
        </List>
      </ListItem>
    )
  );
}

function PriceSlider({ minPrice, maxPrice }: FCProps<{ minPrice: number; maxPrice: number }>): ReactNode {
  const fractionDigits = 2;
  const step = 10 ** -fractionDigits;
  const [initialMin, initialMax] = [minPrice * step, maxPrice * step];
  const textFieldProps = {
    size: 'small',
    inputProps: { type: 'number', min: initialMin, max: initialMax, step },
    InputProps: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
  } as const;

  const { isOpen, Button: SublistButton } = useSubListButton();
  const [range, setRange] = useState<[number, number]>([initialMin, initialMax]);
  const { searchParams, updateUrl } = useSearchParams();

  return (
    <ListItem disablePadding>
      <List
        className="w-full"
        subheader={<SublistButton label="Price" />}
      >
        <Collapse in={isOpen}>
          <Box className="p-2 px-4">
            <Box className="flex items-center justify-evenly gap-2">
              <TextField
                {...textFieldProps}
                label="min"
                value={range[0]}
                onChange={(event) => {
                  setRange([clampValue(initialMin, Number(event.target.value), range[1]), range[1]]);
                }}
              />
              <Typography>-</Typography>
              <TextField
                {...textFieldProps}
                label="max"
                value={range[1]}
                onChange={(event) => {
                  setRange([range[0], clampValue(range[0], Number(event.target.value), initialMax)]);
                }}
              />
            </Box>
            <Box className="p-2">
              <Slider
                value={range}
                disableSwap
                onChange={(_event, values) => {
                  if (Array.isArray(values)) {
                    const [min, max] = values;

                    if (typeof min === 'number' && typeof max === 'number') {
                      setRange([min, max]);
                    }
                  }
                }}
                onChangeCommitted={() => {
                  searchParams.set('priceFrom', range[0].toString());
                  searchParams.set('priceTo', range[1].toString());
                  updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
                }}
                min={initialMin}
                max={initialMax}
                step={step}
              />
            </Box>
          </Box>
        </Collapse>
      </List>
    </ListItem>
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
          ['priceFrom', 'priceTo'].forEach((key) => void searchParams.delete(key));
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
                <PriceSlider
                  minPrice={data.prices.min}
                  maxPrice={data.prices.max}
                />
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
