import dayjs, { isDayjs } from 'dayjs';
import { z } from 'zod';

import { assertPostCode, isAllowedCountry } from './allowed-countries';
import { signInDtoSchema } from './sign-in-dto.schema';

import type { Dayjs } from 'dayjs';

const nameSchema = z
  .string()
  .min(1 /* , 'Must contain at least one character' */)
  .regex(/[^!@#$%^&*]/, 'No special characters allowed')
  .regex(/\D/, 'No numbers allowed');

export const signUpDtoSchema = signInDtoSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    firstName: nameSchema,
    lastName: nameSchema,
    dateOfBirth: z.custom<Dayjs>(isDayjs).refine((date) => {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 13);

      return date.isBefore(dayjs(today));
    }, 'Must be over the age of 13'),
    street: z.string().min(1),
    city: nameSchema,
    postalCode: z.string(),
    country: z.string().refine(isAllowedCountry, 'Must be one of the proposed countries'),
  })
  .superRefine(({ country, postalCode }, ctx) => {
    try {
      assertPostCode(country, postalCode);
    } catch (error) {
      if (error instanceof Error) {
        ctx.addIssue({
          code: 'custom',
          message: error.message,
          path: ['postalCode'],
        });
      }
    }
  });

export type SignUpDto = z.infer<typeof signUpDtoSchema>;
