import { z } from 'zod';

import { $http } from '~/shared/api/commercetools';
import { QueryKey } from '~/shared/lib/tanstack-query';

const operationName = QueryKey.CHANGE_PASSWORD;

const query = `
mutation ${operationName}($version: Long!, $currentPassword: String!, $newPassword: String!) {
  customerChangeMyPassword(version: $version, currentPassword: $currentPassword, newPassword: $newPassword) {
    id
    email
  }
}
`;

const changePasswordSchema = z.object({
  customerChangeMyPassword: z
    .object({
      id: z.string(),
      email: z.string(),
    })
    .nullish(),
});

type ChangePasswordReturn = z.infer<typeof changePasswordSchema>;

type ChangePasswordDto = {
  token: Maybe<string>;
  variables: {
    version: number;
    currentPassword: string;
    newPassword: string;
  };
};

export async function changePassword({ token, variables }: ChangePasswordDto): Promise<ChangePasswordReturn> {
  return $http.gql({ token, operationName, query, variables }).then((data) => changePasswordSchema.parse(data));
}
