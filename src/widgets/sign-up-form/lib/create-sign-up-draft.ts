import { findCountryByLabel } from '~/shared/api/commercetools';

import type { SignUpFormData } from '../model';
import type { signUp } from '~/features/auth';

type SignUpDraft = Parameters<typeof signUp>[0]['variables']['draft'];

export function createSignUpDraft({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  ...addresses
}: SignUpFormData): SignUpDraft {
  const [shippingAddressIndex, billingAddressIndex] = [0, addresses.isSingleAddressMode ? 0 : 1];

  const customerSignMeUpDraft: SignUpDraft & Required<Pick<SignUpDraft, 'addresses'>> = {
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
