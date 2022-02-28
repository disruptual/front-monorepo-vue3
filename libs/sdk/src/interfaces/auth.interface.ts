import { LoginDto } from '@/dtos/login.dto';
import { User } from '@/models/user.model';
import { Maybe, SSOToken } from '@/utils/types';

export interface IAuth {
  login: (credentials: SSOToken | LoginDto) => Promise<User>;
  logout: () => Promise<void>;
  authenticate: () => Promise<Maybe<User>>;
  readonly currentUser: Maybe<User>;
}
