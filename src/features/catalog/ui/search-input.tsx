import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { toastifyError } from '~/shared/lib/react-toastify';
import { useSearchParams } from '~/shared/lib/use-search-params';

import { ParamKey } from '../model';

import type { ReactNode } from 'react';

const initialSearchValue = '';

export function SearchInput(): ReactNode {
  const [value, setValue] = useState(initialSearchValue);
  const { searchParams, updateUrl } = useSearchParams();

  const paramsValue = searchParams.get(ParamKey.SEARCH);

  useEffect(() => {
    setValue(paramsValue ?? initialSearchValue);
  }, [paramsValue]);

  const debouncedUpdateSearchUrl = useDebouncedCallback((): void => {
    if (value === initialSearchValue) {
      searchParams.delete(ParamKey.SEARCH);
    } else {
      searchParams.set(ParamKey.SEARCH, value);
    }

    updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
  }, 750);

  return (
    <ListItem>
      <TextField
        label={
          <Box className="flex items-center">
            <SearchIcon fontSize="small" /> Search
          </Box>
        }
        size="small"
        fullWidth
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          debouncedUpdateSearchUrl();
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => {
                    searchParams.delete(ParamKey.SEARCH);
                    updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
                  }}
                >
                  <ClearIcon fontSize="inherit" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </ListItem>
  );
}
