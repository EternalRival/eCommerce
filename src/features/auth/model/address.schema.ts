import { z } from 'zod';

import { assertPostCode, isAllowedCountryName, nameSchema } from '~/shared/api/commercetools';

export const shippingAddressSchema = z
  .object({
    shippingCountry: z.string().refine(isAllowedCountryName, 'Must be one of the proposed countries'),
    shippingPostalCode: z.string(),
    shippingCity: nameSchema,
    shippingStreet: z.string().min(1, 'Must contain at least one character'),
    shippingIsDefault: z.boolean(),
  })
  .superRefine(({ shippingCountry, shippingPostalCode }, ctx) => {
    try {
      assertPostCode(shippingCountry, shippingPostalCode);
    } catch (error) {
      if (error instanceof Error) {
        ctx.addIssue({ code: 'custom', message: error.message, path: ['shippingPostalCode'] });
      }
    }
  });

export const billingAddressSchema = z
  .object({
    billingCountry: z.string().refine(isAllowedCountryName, 'Must be one of the proposed countries'),
    billingPostalCode: z.string(),
    billingCity: nameSchema,
    billingStreet: z.string().min(1, 'Must contain at least one character'),
    billingIsDefault: z.boolean(),
  })
  .superRefine(({ billingCountry, billingPostalCode }, ctx) => {
    try {
      assertPostCode(billingCountry, billingPostalCode);
    } catch (error) {
      if (error instanceof Error) {
        ctx.addIssue({ code: 'custom', message: error.message, path: ['billingPostalCode'] });
      }
    }
  });
