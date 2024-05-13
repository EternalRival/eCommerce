import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import { getTokenInfoByCredentials, myCustomerSignIn, signInDtoSchema } from '~/shared/api/commercetools';
import { toastifyError } from '~/shared/lib/react-toastify';

import type { Control, UseFormHandleSubmit } from 'react-hook-form';
import type { CustomerSignInResult, SignInDto } from '~/shared/api/commercetools';

type UseSignInReturn = {
  control: Control<SignInDto>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInDto>>;
  isPending: boolean;
};

export function useSignIn(defaultValues: SignInDto): UseSignInReturn {
  const authStore = useAuthStore((store) => store);
  const customerStore = useCustomerStore((store) => store);

  const { control, handleSubmit } = useForm<SignInDto>({
    defaultValues,
    resolver: zodResolver(signInDtoSchema),
    mode: 'onChange',
  });

  type MutationFnReturn = [Parameters<typeof authStore.setCustomerToken>[0], CustomerSignInResult];

  const { isPending, mutate: signIn } = useMutation<MutationFnReturn, Error, SignInDto>({
    async mutationFn(signInDto) {
      const customerToken = authStore.type === 'customer' ? authStore : await getTokenInfoByCredentials(signInDto);

      const signInData = await myCustomerSignIn(customerToken.access_token, signInDto);

      return [customerToken, signInData];
    },

    onError: toastifyError,

    async onSuccess([customerToken, customerSignInResult]) {
      toast.success('Successful sign in');
      authStore.setCustomerToken(customerToken);
      customerStore.update(customerSignInResult.customer);
    },
  });

  return {
    control,
    handleSubmit: handleSubmit((signInDto) => void signIn(signInDto)),
    isPending,
  };
}
