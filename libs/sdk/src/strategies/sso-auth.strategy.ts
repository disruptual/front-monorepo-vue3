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
  payloadParser(payload: any): { accessToken: JWT; refreshToken: JWT };
  onLogin?: (payload: any) => MaybeAsync<any>;
  onLogout?: (payload: any) => MaybeAsync<any>;
  onRefresh?: (payload: any) => MaybeAsync<any>;
};

export class SSOAuthStrategy implements IAuthStrategy<SSOToken> {
  protected http: IHttp;
  protected SSOToken: Maybe<SSOToken> = null;
  protected SSOPayload: Maybe<any> = null;
  protected options: SSOOptions;

  constructor({ http, options }: SSOAuthStrategyOptions) {
    this.http = http;
    this.options = options;
  }

  async handleLogin(token: SSOToken) {
    this.SSOToken = token;
    this.SSOPayload = await this.http.post(endpoints.SSO_LOGIN, {
      data: { token }
    });

    await this.options.onLogin?.(this.SSOPayload);

    return this.options.payloadParser(this.SSOPayload);
  }

  async handleLogout() {
    await this.options.onLogout?.(this.SSOPayload);
  }

  async handleRefresh(refreshToken: JWT) {
    const { token, refresh_token } = await this.http.post(
      endpoints.REFRESH_TOKEN,
      {
        data: { refresh_token: refreshToken }
      }
    );

    await this.options.onRefresh?.(this.SSOPayload);

    return { accessToken: token, refreshToken: refresh_token };
  }
}
