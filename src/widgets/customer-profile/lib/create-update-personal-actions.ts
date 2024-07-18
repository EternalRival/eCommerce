import type { MyCustomerUpdateAction } from '~/features/customer/update';
import type { PersonalFormData } from '../model';

export function createUpdatePersonalActions(
  { email, firstName, lastName, dateOfBirth }: PersonalFormData,
  defaultValues: PersonalFormData
): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = [];

  if (email !== defaultValues.email) {
    actions.push({ changeEmail: { email } });
  }

  if (firstName !== defaultValues.firstName) {
    actions.push({ setFirstName: { firstName } });
  }

  if (lastName !== defaultValues.lastName) {
    actions.push({ setLastName: { lastName } });
  }

  if (dateOfBirth !== defaultValues.dateOfBirth) {
    actions.push({ setDateOfBirth: { dateOfBirth } });
  }

  return actions;
}
