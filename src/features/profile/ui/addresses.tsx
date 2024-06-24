import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { useProfileContext } from '../model';
import { AddressForm } from './address-form';

import type { ReactNode } from 'react';

export function Addresses(): ReactNode {
  const { customer } = useProfileContext();
  const [currentAddress, setCurrentAddress] = useState<Nullable<string>>(null);

  return (
    <Stack
      spacing={2}
      className="py-2"
    >
      {customer.addresses.map((address) => {
        const { id } = address;

        return (
          id && (
            <AddressForm
              key={id}
              address={{ ...address, id }}
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
            />
          )
        );
      })}
    </Stack>
  );
}
