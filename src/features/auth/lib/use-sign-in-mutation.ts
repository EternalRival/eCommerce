import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import { getTokenInfoByCredentials, myCustomerSignIn } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { AuthStateByType } from '~/entities/auth-store';
import type { CustomerSignInResult } from '~/shared/api/commercetools';
import type { SignInDto } from '../model';

type UseSignInMutationReturn = {
  isPending: boolean;
  signIn: (signInDto: SignInDto) => void;
};

type MutationFnReturn = [Omit<AuthStateByType<'customer'>, 'type'>, CustomerSignInResult];

export function useSignInMutation(): UseSignInMutationReturn {
  const authStore = useAuthStore((store) => store);
  const isCustomer = authStore.type === 'customer';

  const customerStore = useCustomerStore((store) => store);

  const { isPending, mutate } = useMutation<MutationFnReturn, Error, SignInDto>({
    async mutationFn(signInDto) {
      const customerToken = isCustomer
        ? authStore
        : await getTokenInfoByCredentials({ username: signInDto.email, password: signInDto.password });
      const customerSignInResult = await myCustomerSignIn(customerToken.access_token, signInDto);

      return [customerToken, customerSignInResult];
    },
    async onSuccess([customerToken, customerSignInResult]) {
      toast.success('Successful sign in');
      authStore.setCustomerToken(customerToken);
      customerStore.setCustomer(customerSignInResult.customer);
    },
    onError: toastifyError,
  });

  return { isPending, signIn: (signInDto) => void mutate(signInDto) };
}
