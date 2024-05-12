import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import { getTokenInfoByCredentials, myCustomerSignIn, signInDtoSchema } from '~/shared/api/commercetools';
import { Route } from '~/shared/model/route.enum';

import type { Control, UseFormHandleSubmit } from 'react-hook-form';
import type { CustomerSignInResult, SignInDto } from '~/shared/api/commercetools';
import type { AuthStateByType } from '~/entities/auth-store/store';

type UseSignInReturn = {
  control: Control<SignInDto>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInDto>>;
  isPending: boolean;
};

export function useSignIn(defaultValues: SignInDto): UseSignInReturn {
  const router = useRouter();
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  const { control, handleSubmit } = useForm<SignInDto>({
    defaultValues,
    resolver: zodResolver(signInDtoSchema),
    mode: 'onChange',
  });

  type MutationFnReturn = [Omit<AuthStateByType<'customer'>, 'type'>, CustomerSignInResult];

  const { isPending, mutate: signIn } = useMutation<MutationFnReturn, Error, SignInDto>({
    async mutationFn(signInDto) {
      const customerToken = authStore.type === 'customer' ? authStore : await getTokenInfoByCredentials(signInDto);

      const signInData = await myCustomerSignIn(customerToken.access_token, signInDto);

      return [customerToken, signInData];
    },

    onError(error) {
      if (!isAxiosError(error)) {
        throw error;
      }

      toast.error(error.message);
    },

    async onSuccess([customerToken, customerSignInResult]) {
      toast.success('Successful sign in');
      authStore.update({ ...customerToken, type: 'customer' });
      customerStore.update(customerSignInResult.customer);
      await router.push(Route.ROOT);
    },
  });

  return {
    control,
    handleSubmit: handleSubmit((signInDto) => void signIn(signInDto)),
    isPending,
  };
}
