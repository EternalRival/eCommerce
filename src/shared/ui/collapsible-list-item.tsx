import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useState } from 'react';

import type { JSX, PropsWithChildren, ReactNode } from 'react';

type CollapsibleListItemProps = Readonly<
  PropsWithChildren<{
    label: ReactNode;
    defaultState?: boolean;
  }>
>;

export function CollapsibleListItem({ children, label, defaultState = true }: CollapsibleListItemProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultState);

  return (
    <ListItem disablePadding>
      <List
        className="w-full"
        subheader={
          <ListItemButton
            className="pl-4 pr-2"
            onClick={() => {
              setIsOpen((state) => !state);
            }}
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
