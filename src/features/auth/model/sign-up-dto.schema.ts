import { z } from 'zod';

import { dateOfBirthSchema, emailSchema, nameSchema, passwordSchema } from '~/shared/api/commercetools';

import { billingAddressSchema, shippingAddressSchema } from './address.schema';

export const signUpDtoSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,

    firstName: nameSchema,
    lastName: nameSchema,
    dateOfBirth: dateOfBirthSchema,
    shippingCountry: z.string(),
    shippingPostalCode: z.string(),
    shippingCity: z.string(),
    shippingStreet: z.string(),
    shippingIsDefault: z.boolean(),

    isSingleAddressMode: z.boolean(),

    billingCountry: z.string(),
    billingPostalCode: z.string(),
    billingCity: z.string(),
    billingStreet: z.string(),
    billingIsDefault: z.boolean(),
  })
  .superRefine((data, ctx) => {
    try {
      shippingAddressSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach(ctx.addIssue);
      }
    }

    if (data.isSingleAddressMode) {
      return;
    }

    try {
      billingAddressSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach(ctx.addIssue);
      }
    }
  });

export type SignUpDto = z.infer<typeof signUpDtoSchema>;
