import { z } from 'zod';

import { CTP_PROJECT_KEY, customerSignInResultSchema, httpClient } from '../model';
import { createContentTypeHeader } from './create-content-type-header';
import { createAuthorizationHeader } from './create-authorization-header';

import type { CustomerSignInResult } from '../model';

const countryCodeSchema = z.string(); // todo CountryCode https://docs.commercetools.com/api/types#ctp:api:type:CountryCode

const baseAddressSchema = z.object({
  id: z.string().optional(),
  key: z.string().optional(),
  externalId: z.string().optional(),
  country: countryCodeSchema,
  title: z.string().optional(),
  salutation: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  streetName: z.string().optional(),
  streetNumber: z.string().optional(),
  additionalStreetInfo: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  state: z.string().optional(),
  company: z.string().optional(),
  department: z.string().optional(),
  building: z.string().optional(),
  apartment: z.string().optional(),
  pOBox: z.string().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  fax: z.string().optional(),
  additionalAddressInfo: z.string().optional(),
});

const myCustomerDraftSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  title: z.string().optional(),
  salutation: z.string().optional(),
  dateOfBirth: z.string().optional(),
  companyName: z.string().optional(),
  vatId: z.string().optional(),
  addresses: z.array(baseAddressSchema).optional(),
  defaultShippingAddress: z.number().optional(),
  defaultBillingAddress: z.number().optional(),
  locale: z.string().optional(),
  stores: z.unknown().optional(),
});

type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;

export async function signUpCustomer(token: string, signUpDto: MyCustomerDraft): Promise<CustomerSignInResult> {
  return httpClient.api
    .post(`/${CTP_PROJECT_KEY}/me/signup`, myCustomerDraftSchema.parse(signUpDto), {
      headers: {
        ...createContentTypeHeader('json'),
        ...createAuthorizationHeader(token),
      },
    })
    .then(({ data }) => customerSignInResultSchema.parse(data));
}
