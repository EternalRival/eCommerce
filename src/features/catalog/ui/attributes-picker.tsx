import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
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
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuthStore } from '~/entities/auth-store';
import { usePizzaAttributesQuery } from '~/entities/pizza-attributes';
import { parseUrl } from '~/shared/lib/parse-url';
import { toastifyError } from '~/shared/lib/react-toastify';

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
  const { isOpen, Button } = useSubListButton();
  const router = useRouter();
  const parsedUrl = parseUrl(router.asPath);
  const params = new URLSearchParams(parsedUrl.search);

  const isActivated = (key: string): boolean => params.has(attribute.key, key);
  const toggleValue = (key: string): void => void params[isActivated(key) ? 'delete' : 'append'](attribute.key, key);
  const updateParams = (): Promise<boolean> => {
    const url = { ...parsedUrl, search: params.toString() };

    return router.replace(url, url, { scroll: false });
  };

  const handleChipClick = (key: string): Promise<boolean> => {
    toggleValue(key);

    return updateParams();
  };

  return (
    attribute.values.length > 0 && (
      <ListItem disablePadding>
        <List
          className="w-full"
          subheader={<Button label={attribute.label} />}
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
  const { isOpen, Button } = useSubListButton();
  const [value, setValue] = useState([minPrice, maxPrice]);

  return (
    <ListItem disablePadding>
      <List
        className="w-full"
        subheader={<Button label="Price" />}
      >
        <Collapse in={isOpen}>
          <Box className="p-2 px-4">
            <Box className="flex items-center gap-2">
              <TextField
                size="small"
                label="min"
                value={value[0]}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
              <Typography>-</Typography>
              <TextField
                size="small"
                label="max"
                value={value[1]}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Box>
            <Box className="p-2">
              <Slider
                // slotProps={{ root: { className: 'px-2' } }}
                value={value}
                disableSwap
                onChange={(_event, sliderValue) => Array.isArray(sliderValue) && void setValue(sliderValue)}
                min={minPrice}
                max={maxPrice}
                step={0.01}
              />
            </Box>
          </Box>
        </Collapse>
      </List>
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
          <PriceSlider
            minPrice={0}
            maxPrice={99999}
          />
          {error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            data.attributes?.map((attribute) => (
              <AttributeItem
                key={attribute.key}
                attribute={attribute}
              />
            ))
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
