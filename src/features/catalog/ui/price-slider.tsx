import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { clampValue } from '~/shared/lib/clamp-value';
import { useSearchParams } from '~/shared/lib/use-search-params';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { ReactNode } from 'react';
import type { FCProps } from '~/shared/model/types';

export type PriceSliderProps = FCProps<{ minPrice: number; maxPrice: number }>;

export function PriceSlider({ minPrice, maxPrice }: PriceSliderProps): ReactNode {
  const fractionDigits = 2;
  const step = 10 ** -fractionDigits;
  const [minDollarPrice, maxDollarPrice] = [minPrice * step, maxPrice * step];

  const textFieldProps = {
    size: 'small',
    inputProps: { type: 'number', min: minDollarPrice, max: maxDollarPrice, step },
    InputProps: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
  } as const;

  const [range, setRange] = useState<[number, number]>([minDollarPrice, maxDollarPrice]);
  const { searchParams, updateUrl } = useSearchParams();

  const [paramsMin, paramsMax] = [searchParams.get('priceFrom'), searchParams.get('priceTo')];
  useEffect(() => {
    const newMin = paramsMin ? Number(paramsMin) : minDollarPrice;
    const newMax = paramsMax ? Number(paramsMax) : maxDollarPrice;
    setRange([newMin, newMax]);
  }, [maxDollarPrice, minDollarPrice, paramsMax, paramsMin]);

  const debouncedUpdateUrl = useDebouncedCallback(() => {
    if (minDollarPrice === range[0]) {
      searchParams.delete('priceFrom');
    } else {
      searchParams.set('priceFrom', range[0].toString());
    }

    if (maxDollarPrice === range[1]) {
      searchParams.delete('priceTo');
    } else {
      searchParams.set('priceTo', range[1].toString());
    }

    updateUrl({ method: 'replace', scroll: false }).catch(toastifyError);
  }, 750);

  return (
    <Box className="p-2 px-4">
      <Box className="flex items-center justify-evenly gap-2">
        <TextField
          {...textFieldProps}
          label="min"
          value={range[0]}
          onChange={(event) => {
            setRange([clampValue(minDollarPrice, Number(event.target.value), range[1]), range[1]]);
            debouncedUpdateUrl();
          }}
        />
        <Typography>-</Typography>
        <TextField
          {...textFieldProps}
          label="max"
          value={range[1]}
          onChange={(event) => {
            setRange([range[0], clampValue(range[0], Number(event.target.value), maxDollarPrice)]);
            debouncedUpdateUrl();
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
          onChangeCommitted={debouncedUpdateUrl}
          min={minDollarPrice}
          max={maxDollarPrice}
          step={step}
        />
      </Box>
    </Box>
  );
}
