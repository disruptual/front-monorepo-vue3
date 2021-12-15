import { LoginDto } from '@/dtos/login.dto';
import { IAuthStrategy } from '@/interfaces/auth-strategy.interface';
import { IHttp } from '@/interfaces/http.interface';
import { endpoints } from '@/utils/enums';
import { JWT, Maybe, MaybeAsync, SSOToken } from '@/utils/types';

export type SSOAuthStrategyOptions = {
  http: IHttp;
  options: SSOOptions;
};

export type SSOOptions = {
  onLogin?: () => MaybeAsync<any>;
  onLogout?: () => MaybeAsync<any>;
  onRefresh?: () => MaybeAsync<any>;
};

export class SSOAuthStrategy implements IAuthStrategy<SSOToken> {
  protected http: IHttp;
  protected SSOToken: Maybe<SSOToken> = null;
  protected options: SSOOptions;

  constructor({ http, options }: SSOAuthStrategyOptions) {
    this.http = http;
    this.options = options;
  }

  async handleLogin(token: SSOToken) {
    this.SSOToken = token;

    const { token: accessToken, refresh_token: refreshToken } =
      await this.http.post(endpoints.SSO_LOGIN, {
        data: { token }
      });

    await this.options.onLogin?.();

    return { accessToken, refreshToken };
  }

  async handleLogout() {
    await this.options.onLogout?.();
  }

  async handleRefresh(refreshToken: JWT) {
    const { token, refresh_token } = await this.http.post(
      endpoints.REFRESH_TOKEN,
      {
        data: { refresh_token: refreshToken }
      }
    );

    await this.options.onRefresh?.();

    return { accessToken: token, refreshToken: refresh_token };
  }
}
