import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useId } from 'react';

import { toastifyError } from '~/shared/lib/react-toastify';
import { useSearchParams } from '~/shared/lib/use-search-params';
import { SortOption, defaultSortOption } from '~/entities/product';

import { ParamKey } from '../model';

import type { ReactNode } from 'react';

export function SortingSelect(): ReactNode {
  const labelId = useId();
  const label = 'Sorting';
  const { searchParams, updateUrl } = useSearchParams();
  const value = searchParams.get(ParamKey.SORT) ?? defaultSortOption;

  return (
    <ListItem className="justify-end">
      <FormControl size="small">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          value={value}
          label={label}
          onChange={(event) => {
            searchParams.set(ParamKey.SORT, event.target.value);
            updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
          }}
        >
          <MenuItem value={SortOption.PRICE_ASC}>
            <Typography>
              <ArrowUpwardIcon fontSize="inherit" /> Price (asc)
            </Typography>
          </MenuItem>
          <MenuItem value={SortOption.PRICE_DESC}>
            <Typography>
              <ArrowDownwardIcon fontSize="inherit" /> Price (desc)
            </Typography>
          </MenuItem>
          <MenuItem value={SortOption.NAME_ASC}>
            <Typography>
              <ArrowUpwardIcon fontSize="inherit" /> Name (asc)
            </Typography>
          </MenuItem>
          <MenuItem value={SortOption.NAME_DESC}>
            <Typography>
              <ArrowDownwardIcon fontSize="inherit" /> Name (desc)
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  );
}
