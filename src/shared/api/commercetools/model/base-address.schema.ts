import { z } from 'zod';

const countryCodeSchema = z.string(); // todo CountryCode https://docs.commercetools.com/api/types#ctp:api:type:CountryCode

export const baseAddressSchema = z.object({
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

export type BaseAddress = z.infer<typeof baseAddressSchema>;
