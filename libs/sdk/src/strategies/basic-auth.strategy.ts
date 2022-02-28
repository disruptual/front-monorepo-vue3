import { LoginDto } from '@/dtos/login.dto';
import { IAuthStrategy } from '@/interfaces/auth-strategy.interface';
import { IHttp } from '@/interfaces/http.interface';
import { endpoints } from '@/utils/enums';
import { JWT } from '@/utils/types';

export type BasicAuthStrategyOptions = {
  http: IHttp;
};

export type BasicAuthSuccessResponse = {
  token: string;
  refresh_token: string;
};

export class BasicAuthStrategy implements IAuthStrategy<LoginDto> {
  protected http: IHttp;

  constructor({ http }: BasicAuthStrategyOptions) {
    this.http = http;
  }

  async handleLogin(credentials: LoginDto) {
    const { token, refresh_token } =
      await this.http.post<BasicAuthSuccessResponse>(endpoints.LOGIN, {
        data: credentials
      });

    return { accessToken: token, refreshToken: refresh_token };
  }

  async handleLogout() {}

  async handleRefresh(refreshToken: JWT) {
    const { token, refresh_token } =
      await this.http.post<BasicAuthSuccessResponse>(endpoints.REFRESH_TOKEN, {
        data: { refresh_token: refreshToken }
      });

    return { accessToken: token, refreshToken: refresh_token };
  }
}
