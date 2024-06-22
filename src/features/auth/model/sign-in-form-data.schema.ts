import { z } from 'zod';

import { emailSchema, passwordSchema } from '~/shared/api/commercetools';

export const signInFormDataSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormData = z.infer<typeof signInFormDataSchema>;
