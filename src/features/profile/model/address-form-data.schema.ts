import { z } from 'zod';

export const addressFormDataSchema = z.object({
  country: z.string(), // TODO заменить согласно ТЗ
  postalCode: z.string().nullish(), // TODO заменить согласно ТЗ
  city: z.string().nullish(), // TODO заменить согласно ТЗ
  street: z.string().nullish(), // TODO заменить согласно ТЗ
  isBilling: z.boolean(),
  isDefaultBilling: z.boolean(),
  isShipping: z.boolean(),
  isDefaultShipping: z.boolean(),
});

/* export const addressFormDataSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirm: passwordSchema,
  })
  .superRefine(({ currentPassword, newPassword, newPasswordConfirm }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The new password must not match the old password',
        path: ['newPassword'],
      });
    }

    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({ code: 'custom', message: 'Passwords must match', path: ['newPasswordConfirm'] });
    }
  }); */

export type AddressFormData = z.infer<typeof addressFormDataSchema>;
