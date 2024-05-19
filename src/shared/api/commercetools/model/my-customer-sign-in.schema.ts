import { z } from 'zod';

// https://docs.commercetools.com/api/projects/me-profile#mycustomersignin
export const myCustomerSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type MyCustomerSignIn = z.infer<typeof myCustomerSignInSchema>;
