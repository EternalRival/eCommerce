import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import clsx from 'clsx';

import { useAuthStore } from '~/entities/auth-store';
import { usePizzaAttributesQuery } from '~/entities/pizza-attributes';

import type { ReactNode } from 'react';
import type { QueryPizzaAttributesReturn } from '~/entities/pizza-attributes';
import type { FCProps } from '~/shared/model/types';

type Attribute = NonNullable<QueryPizzaAttributesReturn['attributes']>[number];

function AttributeItem({ attribute }: FCProps<{ attribute: Attribute }>): ReactNode {
  const [isOpen, setIsOpen] = useState(true);

  return (
    attribute.values.length > 0 && (
      <ListItem disablePadding>
        <List
          className="w-full"
          subheader={
            <ListItemButton
              className="pl-4 pr-2"
              onClick={() => void setIsOpen((state) => !state)}
            >
              <ListItemText
                primary={attribute.label}
                primaryTypographyProps={{ className: 'text-sm' }}
              />
              <ExpandMoreIcon
                className={clsx('transition-transform', isOpen && 'rotate-180')}
                color="action"
              />
            </ListItemButton>
          }
        >
          <Collapse in={isOpen}>
            <Box className="flex flex-wrap gap-2 p-2 pl-4">
              {attribute.values.map(({ key, label }) => (
                <Chip
                  key={key}
                  label={label}
                  variant="outlined"
                  onClick={() => {}}
                />
              ))}
            </Box>
          </Collapse>
        </List>
      </ListItem>
    )
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
