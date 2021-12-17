import { endpoints } from '@/utils/enums';
import { BaseDto } from './base.dto';

export type UserDto = BaseDto<endpoints.USERS> & {
  firstName: string;
  lastName: string;
};
