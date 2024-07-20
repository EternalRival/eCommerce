import { z } from 'zod';

import { assertPostCode, isAllowedCountryName, nameSchema } from '~/shared/api/commercetools';

export const addressFormDataSchema = z
  .object({
    country: z.string().refine(isAllowedCountryName, 'Must be one of the proposed countries'),
    postalCode: z.string(),
    city: nameSchema,
    streetName: z.string().min(1, 'Must contain at least one character'),
    isBilling: z.boolean(),
    isDefaultBilling: z.boolean(),
    isShipping: z.boolean(),
    isDefaultShipping: z.boolean(),
  })
  .superRefine(({ country, postalCode }, ctx) => {
    try {
      assertPostCode(country, postalCode);
    } catch (error) {
      if (error instanceof Error) {
        ctx.addIssue({ code: 'custom', message: error.message, path: ['postalCode'] });
      }
    }
  });

export type AddressFormData = z.infer<typeof addressFormDataSchema>;
