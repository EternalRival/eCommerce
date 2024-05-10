import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '~/entities/auth-store';
import { useCustomerStore } from '~/entities/customer-store';
import { getTokenInfoByCredentials, myCustomerSignIn, signInDtoSchema } from '~/shared/api/commercetools';
import { Route } from '~/shared/model/route.enum';

import type { Control, UseFormHandleSubmit } from 'react-hook-form';
import type { CustomerSignInResult, SignInDto, TokenInfo } from '~/shared/api/commercetools';

type UseSignInReturn = {
  control: Control<SignInDto>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInDto>>;
  errorMessage: Optional<string>;
  clearErrorMessage: () => void;
  isPending: boolean;
};

export function useSignIn(defaultValues: SignInDto): UseSignInReturn {
  const router = useRouter();
  const updateAuth = useAuthStore((store) => store.update);
  const updateCustomer = useCustomerStore((store) => store.update);
  const { control, handleSubmit, formState, setError, clearErrors } = useForm<SignInDto>({
    defaultValues,
    resolver: zodResolver(signInDtoSchema),
    mode: 'onChange',
  });

  const { isPending, mutate: signIn } = useMutation<[TokenInfo, CustomerSignInResult], Error, SignInDto>({
    async mutationFn(signInDto) {
      const tokenInfo = await getTokenInfoByCredentials(signInDto);
      const signInData = await myCustomerSignIn(tokenInfo.access_token, signInDto);

      return [tokenInfo, signInData];
    },

    onError(error) {
      if (!isAxiosError(error)) {
        throw error;
      }

      setError('root', { message: error.message });
    },

    async onSuccess([tokenInfo, customerSignInResult]) {
      updateAuth(tokenInfo);
      updateCustomer(customerSignInResult.customer);
      await router.push(Route.ROOT);
    },
  });

  return {
    control,
    handleSubmit: handleSubmit((signInDto) => void signIn(signInDto)),
    errorMessage: formState.errors.root?.message,
    clearErrorMessage: () => void clearErrors('root'),
    isPending,
  };
}
