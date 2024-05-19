import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { dateFormat } from '~/shared/lib/dayjs';
import { toastifyError } from '~/shared/lib/react-toastify';

import { signUpDtoSchema } from '../model';
import { createFieldPropsFactory } from './create-field-props-factory';

import type { Path, UseFormHandleSubmit, UseFormReturn, UseFormWatch } from 'react-hook-form';
import type { SignUpDto } from '../model';
import type { CreateFieldProps } from './create-field-props-factory';

function useRevalidateFactory({
  watch,
  trigger,
  getFieldState,
}: Pick<UseFormReturn<SignUpDto>, 'watch' | 'trigger' | 'getFieldState'>) {
  function revalidateIfDirty(e: Path<SignUpDto>): void {
    if (getFieldState(e).isDirty) {
      trigger(e).catch(toastifyError);
    }
  }

  return function useRevalidate(publisher: Path<SignUpDto>, ...subscribers: Path<SignUpDto>[]): void {
    const pubValue = watch(publisher);

    useEffect(() => {
      subscribers.forEach(revalidateIfDirty);
    }, [pubValue, subscribers]);
  };
}

export function useSignUpForm(): {
  createProps: CreateFieldProps<SignUpDto>;
  handleSubmit: UseFormHandleSubmit<SignUpDto>;
  watch: UseFormWatch<SignUpDto>;
} {
  const { control, handleSubmit, watch, trigger, getFieldState } = useForm<SignUpDto>({
    resolver: zodResolver(signUpDtoSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'customer@example.com',
      password: '!Q1qqqqq',
      firstName: '',
      lastName: '',
      dateOfBirth: dayjs().format(dateFormat),
      shippingCountry: '',
      shippingPostalCode: '',
      shippingCity: '',
      shippingStreet: '',
      shippingIsDefault: true,
      isSingleAddressMode: true,
      billingCountry: '',
      billingPostalCode: '',
      billingCity: '',
      billingStreet: '',
      billingIsDefault: true,
    },
  });

  const useRevalidate = useRevalidateFactory({ watch, trigger, getFieldState });

  useRevalidate('shippingCountry', 'shippingPostalCode');
  useRevalidate('billingCountry', 'billingPostalCode');
  useRevalidate('isSingleAddressMode', 'billingCountry', 'billingPostalCode', 'billingCity', 'billingStreet');

  return { createProps: createFieldPropsFactory(control), handleSubmit, watch };
}
