import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import { getTokenInfoByCredentials, mutateCustomerSignMeIn } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { MutateCustomerSignMeInReturn } from '~/shared/api/commercetools';
import type { AuthStateByType } from '~/entities/auth-store';
import type { SignInDto } from '../model';

type UseSignInMutationReturn = {
  isPending: boolean;
  signIn: (signInDto: SignInDto) => void;
};

type MutationFnReturn = [Omit<AuthStateByType<'customer'>, 'type'>, MutateCustomerSignMeInReturn];

export function useSignInMutation(): UseSignInMutationReturn {
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  const { isPending, mutate } = useMutation<MutationFnReturn, Error, SignInDto>({
    async mutationFn(signInDto) {
      const customerToken = await getTokenInfoByCredentials({
        username: signInDto.email,
        password: signInDto.password,
      });

      const signInResult = await mutateCustomerSignMeIn(customerToken.access_token, signInDto);

      return [customerToken, signInResult];
    },
    async onSuccess([customerToken, signInResult]) {
      toast.success('Successful sign in');
      authStore.setCustomerToken(customerToken);
      customerStore.setCustomer(signInResult.customer);
    },
    onError: toastifyError,
  });

  return { isPending, signIn: (signInDto) => void mutate(signInDto) };
}
