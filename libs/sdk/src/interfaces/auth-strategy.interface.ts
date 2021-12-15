import { LoginDto } from '@/dtos/login.dto';
import { JWT, SSOToken } from '@/utils/types';

export interface IAuthStrategy<T extends SSOToken | LoginDto> {
  handleLogin(credentials: T): Promise<{ accessToken: JWT; refreshToken: JWT }>;

  handleLogout: () => Promise<void>;

  handleRefresh: (
    refreshToken: JWT
  ) => Promise<{ accessToken: JWT; refreshToken: JWT }>;
}
