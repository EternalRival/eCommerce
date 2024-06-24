import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PageSpinner } from '~/entities/page-spinner';
import { ALLOWED_COUNTRY_NAMES, findCountryByCode } from '~/shared/api/commercetools';
import { createFieldPropsFactory } from '~/shared/lib/react-hook-form';
import { toastifyError } from '~/shared/lib/react-toastify';
import {
  ControlledCheckbox,
  ControlledStringAutocomplete,
  ControlledTextField,
  MuiForm,
  SubmitButton,
} from '~/shared/ui';

import { addressFormDataSchema, useProfileContext } from '../model';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { FCProps } from '~/shared/model/types';
import type { AddressFormData, Customer } from '../model';

export function AddressForm({
  address,
  currentAddress,
  setCurrentAddress,
}: FCProps<{
  address: Customer['addresses'][number] & { id: string };
  currentAddress: Nullable<string>;
  setCurrentAddress: Dispatch<SetStateAction<Nullable<string>>>;
}>): ReactNode {
  const { customer, editMode, setEditMode } = useProfileContext();
  const isEditMode = editMode === 'Addresses' && currentAddress === address.id;
  const toggleEditMode = (): void => {
    setEditMode(isEditMode ? 'None' : 'Addresses');
    setCurrentAddress(isEditMode ? null : address.id);
  };

  const [isPending, setIsPending] = useState(false);

  const defaultValues = useMemo(
    () => ({
      country: findCountryByCode(address.country).label,
      postalCode: address.postalCode,
      city: address.city,
      street: address.streetName,
      isBilling: customer.billingAddressIds.includes(address.id),
      isDefaultBilling: customer.defaultBillingAddressId === address.id,
      isShipping: customer.shippingAddressIds.includes(address.id),
      isDefaultShipping: customer.defaultShippingAddressId === address.id,
    }),
    [
      address.city,
      address.country,
      address.id,
      address.postalCode,
      address.streetName,
      customer.billingAddressIds,
      customer.defaultBillingAddressId,
      customer.defaultShippingAddressId,
      customer.shippingAddressIds,
    ]
  );
  const { control, handleSubmit, formState, reset } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormDataSchema),
    mode: 'onChange',
    defaultValues,
  });
  const createProps = createFieldPropsFactory(control);

  // const queryClient = useQueryClient();
  // const updateMutation = useCustomerUpdateMutation();

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
      {isPending && <PageSpinner />}
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

            <SubmitButton
              isPending={isPending}
              isDisabled={!formState.isDirty}
            />
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
