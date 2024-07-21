import type { MyCustomerUpdateAction } from '~/features/customer/update';
import type { AddressFormData } from '../model';

export function createSetAddressTypesActions(
  { isBilling, isDefaultBilling, isShipping, isDefaultShipping }: AddressFormData,
  addressId: string
): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = [];

  if (isBilling) {
    actions.push(
      isDefaultBilling ? { setDefaultBillingAddress: { addressId } } : { addBillingAddressId: { addressId } }
    );
  }

  if (isShipping) {
    actions.push(
      isDefaultShipping ? { setDefaultShippingAddress: { addressId } } : { addShippingAddressId: { addressId } }
    );
  }

  return actions;
}
