import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PageSpinner } from '~/entities/page-spinner';
import { ALLOWED_COUNTRY_NAMES } from '~/shared/api/commercetools';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import { ControlledCheckbox, ControlledStringAutocomplete, ControlledTextField, MuiForm } from '~/shared/ui';

import { addressFormDataSchema } from '../model';
import { useSyncAddressStateFactory } from '../lib';

import type { JSX } from 'react';
import type { AddressFormData } from '../model';

type AddressFormProps = Readonly<{
  addressFormData: AddressFormData;
  isEditMode: boolean;
  toggleEditMode: () => void;
}>;

export function AddressForm({ addressFormData, isEditMode, toggleEditMode }: AddressFormProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);

  const defaultValues = addressFormData;
  const { control, handleSubmit, formState, reset, setValue, watch } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  // const queryClient = useQueryClient();
  // const updateMutation = useCustomerUpdateMutation();

  const useSyncAddressState = useSyncAddressStateFactory({ setValue, watch });

  useSyncAddressState('isBilling', 'isDefaultBilling');
  useSyncAddressState('isShipping', 'isDefaultShipping');

  useEffect(() => {
    if (!isEditMode) {
      reset(defaultValues);
    }
  }, [defaultValues, isEditMode, reset]);

  return (
    <MuiForm
      className="mx-auto"
      onSubmit={(event) =>
        void handleSubmit(async (formData) => {
          setIsPending(true);

          try {
            toast(JSON.stringify(formData, null, 2));
          } catch (error) {
            toastifyError(error);
          }

          setIsPending(false);
        })(event)
      }
    >
      <PageSpinner isEnabled={isPending} />

      <Paper className="p-4">
        <FormControlLabel
          control={
            <Switch
              checked={isEditMode}
              onChange={() => void toggleEditMode()}
            />
          }
          label="Edit mode"
          className="select-none"
        />

        <ControlledStringAutocomplete
          {...createProps('country')}
          fieldProps={{ label: 'Country', disabled: !isEditMode }}
          options={ALLOWED_COUNTRY_NAMES}
        />
        <ControlledTextField
          {...createProps('postalCode')}
          fieldProps={{ label: 'Postal code', disabled: !isEditMode }}
        />
        <ControlledTextField
          {...createProps('city')}
          fieldProps={{ label: 'City', disabled: !isEditMode }}
        />
        <ControlledTextField
          {...createProps('street')}
          fieldProps={{ label: 'Street', disabled: !isEditMode }}
        />

        <Box className="grid grid-cols-2">
          <ControlledCheckbox
            {...createProps('isBilling')}
            labelProps={{ label: 'Billing', disabled: !isEditMode }}
          />
          <ControlledCheckbox
            {...createProps('isDefaultBilling')}
            labelProps={{ label: 'Default', disabled: !isEditMode }}
          />

          <ControlledCheckbox
            {...createProps('isShipping')}
            labelProps={{ label: 'Shipping', disabled: !isEditMode }}
          />
          <ControlledCheckbox
            {...createProps('isDefaultShipping')}
            labelProps={{ label: 'Default', disabled: !isEditMode }}
          />
        </Box>
        <Collapse in={isEditMode}>
          <Box className="mt-2">
            <Button
              variant="outlined"
              fullWidth
              color="error"
            >
              Delete address
            </Button>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="my-2"
              disabled={!formState.isDirty || isPending}
            >
              Change address
            </Button>
          </Box>
        </Collapse>
      </Paper>
    </MuiForm>
  );
}

/* 
{
  "email": "customer@example.com",
  "version": 1,
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2000-11-11",
  "addresses": [
    {
      "id": "DASw3kl0",
      "country": "KZ",
      "postalCode": "123123",
      "city": "CitS",
      "streetName": "StreS"
    },
    {
      "id": "v7dvwnCk",
      "country": "PL",
      "postalCode": "12-123",
      "city": "CitB",
      "streetName": "StreB"
    }
  ],
  "billingAddressIds": [
    "v7dvwnCk"
  ],
  "defaultBillingAddressId": "v7dvwnCk",
  "shippingAddressIds": [
    "DASw3kl0"
  ],
  "defaultShippingAddressId": null
}
*/
