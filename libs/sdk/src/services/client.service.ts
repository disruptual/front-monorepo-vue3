import { IAuth } from '@/interfaces/auth.interface';
import { IHttp } from '@/interfaces/http.interface';
import { SSOOptions } from '@/strategies/sso-auth.strategy';
import { AuthService, LoginCredentials, WithSSO } from './auth.service';

export type DisruptualClientOptions = {
  http: IHttp;
  sso: boolean;
  ssoOptions?: SSOOptions;
};

export class DisruptualClient {
  private http: IHttp;
  private authInstance: IAuth;

  constructor({ http, sso, ssoOptions }: DisruptualClientOptions) {
    this.http = http;

    // @ts-ignore
    this.authInstance = new AuthService({ http, sso, ssoOptions });
  }

  login(credentials: LoginCredentials) {
    return this.authInstance.login(credentials);
  }

  logout() {
    return this.authInstance.logout();
  }
}
