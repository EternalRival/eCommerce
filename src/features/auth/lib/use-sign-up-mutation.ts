import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { toastifyError } from '~/shared/lib/react-toastify';

import type { SignUpDto } from '../model';

type UseSignUpMutationReturn = {
  isPending: boolean;
  signUp: (signUpDto: SignUpDto) => void;
};

type MutationFnReturn = unknown;

export function useSignUpMutation(): UseSignUpMutationReturn {
  const { isPending, mutate } = useMutation<MutationFnReturn, Error, SignUpDto>({
    async mutationFn(signUpDto) {
      toast('отправил запрос');

      // TODO флоу регистрации (запрос)
      toast.info(String(signUpDto.isSingleAddressMode));
      // TODO флоу регистрации (парсинг ответа)

      return signUpDto.isSingleAddressMode ? 1 : 2;
    },
    async onSuccess(mutationFnReturn) {
      toast.success('Successful sign up');

      // TODO флоу успешной регистрации (сторы)
      toast.success(String(mutationFnReturn));
    },
    onError: toastifyError,
  });

  return { isPending, signUp: (signUpDto) => void mutate(signUpDto) };
}
