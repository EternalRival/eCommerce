import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { findCountryByCode } from '~/shared/api/commercetools';

import { addressFormDataSchema, useProfileContext } from '../model';
import { AddressForm } from './address-form';

import type { ReactNode } from 'react';

export function Addresses(): ReactNode {
  const { customer, editMode, setEditMode } = useProfileContext();
  const [currentAddress, setCurrentAddress] = useState<Nullable<string>>(null);

  return (
    <Stack
      spacing={2}
      className="py-2"
    >
      {customer.addresses.map((address) => {
        const { id } = address;

        if (!id) {
          return null;
        }

        const addressFormData = addressFormDataSchema
          .nullable()
          .catch(null)
          .parse({
            country: findCountryByCode(address.country).label,
            postalCode: address.postalCode,
            city: address.city,
            street: address.streetName,
            isBilling: customer.billingAddressIds.includes(id),
            isDefaultBilling: customer.defaultBillingAddressId === id,
            isShipping: customer.shippingAddressIds.includes(id),
            isDefaultShipping: customer.defaultShippingAddressId === id,
          });

        const isEditMode = editMode === 'Addresses' && currentAddress === id;
        const toggleEditMode = (): void => {
          setEditMode(isEditMode ? 'None' : 'Addresses');
          setCurrentAddress(isEditMode ? null : id);
        };

        return (
          addressFormData && (
            <AddressForm
              key={id}
              addressFormData={addressFormData}
              isEditMode={isEditMode}
              toggleEditMode={toggleEditMode}
            />
          )
        );
      })}
    </Stack>
  );
}
