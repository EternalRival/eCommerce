import { z } from 'zod';

import { dateOfBirthSchema, emailSchema, nameSchema } from '~/shared/api/commercetools';

export const personalFormDataSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: dateOfBirthSchema,
});

export type PersonalFormData = z.infer<typeof personalFormDataSchema>;
