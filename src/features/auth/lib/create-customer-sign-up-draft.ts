import { findCountryByLabel } from '~/shared/api/commercetools';

import type { useCustomerSignUpMutation } from '~/entities/customer';
import type { SignUpDto } from '../model';

type CustomerSignUpDraft = Parameters<
  ReturnType<typeof useCustomerSignUpMutation>['mutateAsync']
>[0]['variables']['draft'];

export function createCustomerSignUpDraft({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  ...addresses
}: SignUpDto): CustomerSignUpDraft {
  const [shippingAddressIndex, billingAddressIndex] = [0, addresses.isSingleAddressMode ? 0 : 1];

  const customerSignMeUpDraft: CustomerSignUpDraft & Required<Pick<CustomerSignUpDraft, 'addresses'>> = {
    ...{ email, password, firstName, lastName, dateOfBirth },
    addresses: [
      {
        country: findCountryByLabel(addresses.shippingCountry).code,
        postalCode: addresses.shippingPostalCode,
        city: addresses.shippingCity,
        streetName: addresses.shippingStreet,
      },
    ],
    shippingAddresses: [shippingAddressIndex],
    billingAddresses: [billingAddressIndex],
  };

  if (!addresses.isSingleAddressMode) {
    customerSignMeUpDraft.addresses.push({
      country: findCountryByLabel(addresses.billingCountry).code,
      postalCode: addresses.billingPostalCode,
      city: addresses.billingCity,
      streetName: addresses.billingStreet,
    });
  }

  if (addresses.shippingIsDefault) {
    customerSignMeUpDraft.defaultShippingAddress = shippingAddressIndex;
  }

  if (addresses.billingIsDefault) {
    customerSignMeUpDraft.defaultBillingAddress = billingAddressIndex;
  }

  return customerSignMeUpDraft;
}
