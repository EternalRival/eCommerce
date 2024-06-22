import { z } from 'zod';

import { passwordSchema } from '~/shared/api/commercetools';

export const changePasswordFormDataSchema = z
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
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordFormDataSchema>;
