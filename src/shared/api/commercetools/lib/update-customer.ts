import { $http, CTP_PROJECT_KEY, customerSchema, updateCustomerDtoSchema } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';

import type { Customer, UpdateCustomerDto } from '../model';

export async function updateCustomer(token: string, updateDto: UpdateCustomerDto): Promise<Customer> {
  return $http.api
    .post(`/${CTP_PROJECT_KEY}/me`, updateCustomerDtoSchema.parse(updateDto), {
      headers: createAuthorizationHeader(token),
    })
    .then(({ data }) => customerSchema.parse(data));
}
