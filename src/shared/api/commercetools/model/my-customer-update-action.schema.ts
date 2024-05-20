import { z } from 'zod';

import { jsonSchema } from '~/shared/lib/zod';

import { baseAddressSchema } from './base-address.schema';

export const myCustomerUpdateActionSchema = z.union([
  z.object({
    action: z.literal('changeEmail'),
    email: z.string(),
  }),
  z.object({
    action: z.literal('setFirstName'),
    firstName: z.string().optional(),
  }),
  z.object({
    action: z.literal('setLastName'),
    lastName: z.string().optional(),
  }),
  z.object({
    action: z.literal('setMiddleName'),
    middleName: z.string().optional(),
  }),
  z.object({
    action: z.literal('setTitle'),
    title: z.string().optional(),
  }),
  z.object({
    action: z.literal('setSalutation'),
    salutation: z.string().optional(),
  }),
  z.object({
    action: z.literal('addAddress'),
    address: baseAddressSchema,
  }),
  z.object({
    action: z.literal('changeAddress'),
    addressId: z.string().optional(),
    address: baseAddressSchema,
  }),
  z.object({
    action: z.literal('changeAddress'),
    addressKey: z.string().optional(),
    address: baseAddressSchema,
  }),
  z.object({
    action: z.literal('removeAddress'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('removeAddress'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('setDefaultShippingAddress'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('setDefaultShippingAddress'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('addShippingAddressId'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('addShippingAddressId'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('removeShippingAddressId'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('removeShippingAddressId'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('setDefaultBillingAddress'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('setDefaultBillingAddress'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('addBillingAddressId'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('addBillingAddressId'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('removeBillingAddressId'),
    addressId: z.string().optional(),
  }),
  z.object({
    action: z.literal('removeBillingAddressId'),
    addressKey: z.string().optional(),
  }),
  z.object({
    action: z.literal('setCompanyName'),
    companyName: z.string().optional(),
  }),
  z.object({
    action: z.literal('setDateOfBirth'),
    dateOfBirth: z.string().optional(),
  }),
  z.object({
    action: z.literal('setVatId'),
    vatId: z.string().optional(),
  }),
  z.object({
    action: z.literal('setCustomType'),
    type: z
      .union([z.object({ id: z.string(), typeId: z.string() }), z.object({ key: z.string(), typeId: z.string() })])
      .optional(),
    fields: jsonSchema.optional(),
  }),
  z.object({
    action: z.literal('setCustomField'),
    name: z.string(),
    value: z.unknown().optional(),
  }),
  z.object({
    action: z.literal('setLocale'),
    locale: z.string().optional(),
  }),
]);

export type MyCustomerUpdateAction = z.infer<typeof myCustomerUpdateActionSchema>;
