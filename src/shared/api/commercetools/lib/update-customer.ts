import { CTP_PROJECT_KEY, customerSchema, httpClient, updateCustomerDtoSchema } from '../model';
import { createAuthorizationHeader } from './create-authorization-header';
import { createContentTypeHeader } from './create-content-type-header';

import type { Customer, UpdateCustomerDto } from '../model';

export async function updateCustomer(token: string, updateDto: UpdateCustomerDto): Promise<Customer> {
  return httpClient.api
    .post(`/${CTP_PROJECT_KEY}/me`, updateCustomerDtoSchema.parse(updateDto), {
      headers: {
        ...createContentTypeHeader('json'),
        ...createAuthorizationHeader(token),
      },
    })
    .then(({ data }) => customerSchema.parse(data));
}
