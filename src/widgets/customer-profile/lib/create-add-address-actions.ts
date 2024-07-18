import { findCountryByLabel } from '~/shared/api/commercetools';

import type { MyCustomerUpdateAction } from '~/features/customer/update';
import type { AddressFormData } from '../model';

export function createAddAddressActions({
  country,
  city,
  postalCode,
  street,
}: AddressFormData): MyCustomerUpdateAction[] {
  return [
    {
      addAddress: {
        address: {
          country: findCountryByLabel(country).code,
          city,
          postalCode,
          streetName: street,
        },
      },
    },
  ];
}
