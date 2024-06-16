import dayjs from 'dayjs';
import { z } from 'zod';

export const dateOfBirthSchema = z
  .string()
  .date('Required')
  .refine((date) => dayjs().diff(dayjs(date), 'y') >= 13, 'Must be over the age of 13');
