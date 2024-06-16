import { z } from 'zod';

import { emailSchema, passwordSchema } from '~/shared/api/commercetools';

export const signInDtoSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInDto = z.infer<typeof signInDtoSchema>;
