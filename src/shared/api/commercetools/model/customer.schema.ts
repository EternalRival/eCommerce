import { z } from 'zod';

import { baseAddressSchema } from './base-address.schema';

const string = z.string();
const number = z.number();
const boolean = z.boolean();
const unknown = z.unknown(); // * placeholder для неописанных типов

// https://docs.commercetools.com/api/projects/customers
export const customerSchema = z.object({
  id: string,
  version: number,
  key: string
    .min(2)
    .max(256)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
  customerNumber: string.optional(),
  externalId: string.optional(),
  email: string,
  password: string.optional(),
  firstName: string.optional(),
  lastName: string.optional(),
  middleName: string.optional(),
  title: string.optional(),
  dateOfBirth: string.date().optional(),
  companyName: string.optional(),
  vatId: string.optional(),
  addresses: z.array(baseAddressSchema),
  defaultShippingAddressId: string.optional(),
  shippingAddressId: z.array(string).optional(),
  defaultBillingAddressId: string.optional(),
  billingAddressId: z.array(string).optional(),
  isEmailVerified: boolean,
  customerGroup: unknown.optional(),
  locale: unknown.optional(),
  salutation: string.optional(),
  stores: unknown,
  authenticationMode: unknown.optional(),
  custom: unknown.optional(),
  createdAt: unknown,
  createdBy: unknown.optional(),
  lastModifiedAt: unknown,
  lastModifiedBy: unknown.optional(),
});

export type Customer = z.infer<typeof customerSchema>;
