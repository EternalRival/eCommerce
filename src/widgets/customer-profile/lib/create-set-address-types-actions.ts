import type { MyCustomerUpdateAction } from '~/features/customer/update';
import type { AddressFormData } from '../model';

export function createSetAddressTypesActions(
  { isBilling, isDefaultBilling, isShipping, isDefaultShipping }: AddressFormData,
  addressId: string
): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = [];

  if (isBilling) {
    if (isDefaultBilling) {
      actions.push({ setDefaultBillingAddress: { addressId } });
    } else {
      actions.push({ addBillingAddressId: { addressId } });
    }
  }

  if (isShipping) {
    if (isDefaultShipping) {
      actions.push({ setDefaultShippingAddress: { addressId } });
    } else {
      actions.push({ addShippingAddressId: { addressId } });
    }
  }

  return actions;
}
