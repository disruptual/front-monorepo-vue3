import { UserDto } from '@/dtos/user.dto';
import { endpoints } from '@/utils/enums';
import { BaseEntity } from './base.entity';

export class User extends BaseEntity<endpoints.USERS> {
  public firstName: string;

  public lastName: string;

  constructor(dto: UserDto) {
    super(dto);

    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
  }
}
