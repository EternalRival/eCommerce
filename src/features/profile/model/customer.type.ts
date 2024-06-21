import type { QueryCustomerReturn } from '~/entities/customer';

export type Customer = NonNullable<QueryCustomerReturn['me']>['customer'];
