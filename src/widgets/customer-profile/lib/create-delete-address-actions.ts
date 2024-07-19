import type { MyCustomerUpdateAction } from '~/features/customer/update';

export function createDeleteAddressActions(addressId: string): MyCustomerUpdateAction[] {
  return [{ removeAddress: { addressId } }];
}
