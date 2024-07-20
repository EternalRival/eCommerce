import { findCountryByLabel } from '~/shared/api/commercetools';

import type { MyCustomerUpdateAction } from '~/features/customer/update';
import type { AddressFormData } from '../model';

export function createUpdateAddressActions(
  {
    country,
    postalCode,
    city,
    streetName,
    isBilling,
    isDefaultBilling,
    isShipping,
    isDefaultShipping,
  }: AddressFormData,
  {
    isBilling: wasBilling,
    isDefaultBilling: wasDefaultBilling,
    isShipping: wasShipping,
    isDefaultShipping: wasDefaultShipping,
  }: AddressFormData,
  addressId: string
): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = [
    {
      changeAddress: {
        addressId,
        address: {
          country: findCountryByLabel(country).code,
          postalCode,
          city,
          streetName,
        },
      },
    },
  ];

  if (isBilling) {
    if (isDefaultBilling !== wasDefaultBilling) {
      actions.push(
        ...(isDefaultBilling
          ? [{ setDefaultBillingAddress: { addressId } }]
          : [{ removeBillingAddressId: { addressId } }, { addBillingAddressId: { addressId } }])
      );
    } else if (!wasBilling) {
      actions.push({ addBillingAddressId: { addressId } });
    }
  } else if (wasBilling) {
    actions.push({ removeBillingAddressId: { addressId } });
  }

  if (isShipping) {
    if (isDefaultShipping !== wasDefaultShipping) {
      actions.push(
        ...(isDefaultShipping
          ? [{ setDefaultShippingAddress: { addressId } }]
          : [{ removeShippingAddressId: { addressId } }, { addShippingAddressId: { addressId } }])
      );
    } else if (!wasShipping) {
      actions.push({ addShippingAddressId: { addressId } });
    }
  } else if (wasShipping) {
    actions.push({ removeShippingAddressId: { addressId } });
  }

  return actions;
}
