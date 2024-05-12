import dayjs, { isDayjs } from 'dayjs';
import { z } from 'zod';

import { ALLOWED_COUNTRIES, ALLOWED_COUNTRY_POSTCODES } from './allowed-countries';
import { passwordSchema } from './password.schema';

import type { Dayjs } from 'dayjs';

type PostCodeEntity = (typeof ALLOWED_COUNTRY_POSTCODES)[number];

function findPostCodeEntityByName(name: string): Nullable<PostCodeEntity> {
  return ALLOWED_COUNTRY_POSTCODES.find((postCodeEnt) => postCodeEnt.name === name) ?? null;
}

function assertPostCode(country: string, postCode: string): void {
  const postCodeEntity = findPostCodeEntityByName(country);

  if (!postCodeEntity) {
    throw new Error('Country not found');
  }

  if (!postCodeEntity.regex.test(postCode)) {
    throw new Error(`Post code must follow ${postCodeEntity.example} format`);
  }
}

function isAllowedCountry(country: string): boolean {
  return ALLOWED_COUNTRIES.includes(country);
}

const nameSchema = z
  .string()
  .min(1 /* , 'Must contain at least one character' */)
  .regex(/[^!@#$%^&*]/, 'No special characters allowed')
  .regex(/\D/, 'No numbers allowed');

export const signUpDtoSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
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
  .strip()
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
