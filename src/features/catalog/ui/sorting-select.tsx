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

import type { ReactNode } from 'react';

export function SortingSelect(): ReactNode {
  const labelId = useId();
  const label = 'Sorting';
  const { searchParams, updateUrl } = useSearchParams();
  const value = searchParams.get('sort') ?? 'price asc';

  return (
    <ListItem className="justify-end">
      <FormControl size="small">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          value={value}
          label={label}
          onChange={(event) => {
            searchParams.set('sort', event.target.value);
            updateUrl().catch(toastifyError);
          }}
        >
          <MenuItem value="price asc">
            <Typography>
              <ArrowUpwardIcon fontSize="inherit" /> Price (asc)
            </Typography>
          </MenuItem>
          <MenuItem value="price desc">
            <Typography>
              <ArrowDownwardIcon fontSize="inherit" /> Price (desc)
            </Typography>
          </MenuItem>
          <MenuItem value="name.en asc">
            <Typography>
              <ArrowUpwardIcon fontSize="inherit" /> Name (asc)
            </Typography>
          </MenuItem>
          <MenuItem value="name.en desc">
            <Typography>
              <ArrowDownwardIcon fontSize="inherit" /> Name (desc)
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  );
}
