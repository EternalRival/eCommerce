import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

import { dateFormat } from '~/shared/lib/dayjs';

import type { TextFieldProps } from '@mui/material/TextField';
import type { Control, FieldValues, Path } from 'react-hook-form';

type ControlledDatePickerProps<T extends FieldValues> = Readonly<{
  control: Control<T>;
  name: Path<T>;
  fieldProps?: Omit<TextFieldProps, 'name'>;
}>;

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  fieldProps,
}: ControlledDatePickerProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState: { error, invalid } }) => (
        <DatePicker
          {...field}
          closeOnSelect
          format={dateFormat}
          value={dayjs(value)}
          onChange={(date) => void onChange(date?.format(dateFormat) ?? null)}
          disabled={fieldProps?.disabled}
          slotProps={{
            textField: {
              required: true,
              size: 'small',
              fullWidth: true,
              margin: 'dense',
              ...fieldProps,
              error: invalid,
              helperText: error?.message ?? ' ',
            },
          }}
        />
      )}
    />
  );
}
