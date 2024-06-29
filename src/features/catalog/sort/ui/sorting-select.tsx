import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useId } from 'react';

import { ParamKey, SortOption, defaultSortOption } from '~/entities/products';
import { toastifyError } from '~/shared/lib/react-toastify';
import { useSearchParams } from '~/shared/lib/use-search-params';

export function SortingSelect(): JSX.Element {
  const labelId = useId();
  const label = 'Sorting';
  const { searchParams, updateUrl } = useSearchParams();
  const value = searchParams.get(ParamKey.SORT) ?? defaultSortOption;

  return (
    <Box className="flex justify-end px-4 py-2">
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
    </Box>
  );
}
