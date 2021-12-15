import { endpoints } from '@/utils/enums';
import { BaseEntity } from './base.entity';
import { BaseDto } from '@/interfaces/base-entity.interface';

export type UserDto = BaseDto<endpoints.USERS> & {
  firstName: string;
  lastName: string;
};

export class User extends BaseEntity<endpoints.USERS> {
  public firstName: string;

  public lastName: string;

  constructor(dto: UserDto) {
    super(dto);

    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
  }
}
