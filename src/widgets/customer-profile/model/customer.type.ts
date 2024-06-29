import type { GetCustomerReturn } from '~/features/customer/get';

export type Customer = NonNullable<GetCustomerReturn['me']>['customer'];
