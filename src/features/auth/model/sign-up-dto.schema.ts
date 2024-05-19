import dayjs from 'dayjs';
import { z } from 'zod';

import { billingAddressSchema, shippingAddressSchema } from './address.schema';
import { nameSchema } from './name.schema';
import { passwordSchema } from './password.schema';

export const signUpDtoSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,

    firstName: nameSchema,
    lastName: nameSchema,
    dateOfBirth: z
      .string()
      .date('Required')
      .refine((date) => dayjs().diff(dayjs(date), 'y') >= 13, 'Must be over the age of 13'),

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
