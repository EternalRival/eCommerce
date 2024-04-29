import { z } from 'zod';

import { signInDtoSchema } from './sign-in-dto.schema';

const nameSchema = z
  .string()
  .min(1 /* , 'Must contain at least one character' */)
  .regex(/[!@#$%^&*]/, 'No special characters allowed')
  .regex(/\D/, 'No numbers allowed');

export const signUpDtoSchema = signInDtoSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    firstName: nameSchema,
    lastName: nameSchema,
    dateOfBirth: z.date(), // todo >13yo
    address: z.object({
      street: z.string().min(1),
      city: nameSchema,
      postalCode: z.string(), // Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)
      country: z.enum(['Russia', 'Belarus']), // Must be a valid country from a predefined list or autocomplete field
    }),
  });

export type SignUpDto = z.infer<typeof signUpDtoSchema>;
