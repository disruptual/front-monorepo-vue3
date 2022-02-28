import { UserDto } from '@/dtos/user.dto';

export class User {
  username!: string;

  constructor(dto: UserDto) {
    Object.assign(this, dto);
  }
}
