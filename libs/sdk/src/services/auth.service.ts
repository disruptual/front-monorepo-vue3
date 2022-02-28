import jwtDecode from 'jwt-decode';
import { isBefore } from 'date-fns';

import { LoginDto } from '@/dtos/login.dto';
import { User } from '@/models/user.model';
import { IAuthStrategy } from '@/interfaces/auth-strategy.interface';
import { IAuth } from '@/interfaces/auth.interface';
import { HttpRequestConfig, IHttp } from '@/interfaces/http.interface';
import { BasicAuthStrategy } from '@/strategies/basic-auth.strategy';
import { SSOAuthStrategy, SSOOptions } from '@/strategies/sso-auth.strategy';
import { JWT, JwtPayload, Maybe, SSOToken } from '@/utils/types';
import { endpoints } from '@/utils/enums';
import { autoBind } from '@/utils/decorators';
import { UserDto } from '@/dtos/user.dto';

export type WithSSO<T> =
  | ({
      sso: false;
      ssoOptions?: never;
    } & T)
  | ({
      sso: true;
      ssoOptions: SSOOptions;
    } & T);

export type AuthServiceOptions = WithSSO<{
  http: IHttp;
}>;

export type LoginCredentials = SSOToken | LoginDto;

type AuthTokens = {
  accessToken: JWT;
  refreshToken: JWT;
};

// These URL do not need to be checked for token refresh before being requested
const REFRESH_EXCLUDED_URLS: string[] = [
  endpoints.LOGIN,
  endpoints.SSO_LOGIN,
  endpoints.REFRESH_TOKEN
];

export class AuthService implements IAuth {
  private http: IHttp;

  private strategy: IAuthStrategy<LoginCredentials>;

  private get tokens(): Maybe<AuthTokens> {
    const tokens = localStorage.getItem('dsp-auth-tokens');

    return tokens ? JSON.parse(tokens) : tokens;
  }

  private set tokens(tokens) {
    localStorage.setItem('dsp-auth-tokens', JSON.stringify(tokens));
  }

  private refreshPromise: Maybe<Promise<any>> = null;

  private _currentUser: Maybe<User> = null;

  constructor({ http, sso, ssoOptions }: AuthServiceOptions) {
    this.http = http;
    this.strategy = sso
      ? new SSOAuthStrategy({ http, options: ssoOptions })
      : new BasicAuthStrategy({ http });
    this.http.onRequest(this.refreshIfNeeded).onRequest(this.setHeaders);
  }

  get jwtPayload(): Maybe<JwtPayload> {
    if (!this.tokens?.accessToken) return null;

    return jwtDecode<JwtPayload>(this.tokens.accessToken);
  }

  get tokenExpirationDate(): Maybe<Date> {
    if (!this.jwtPayload) return null;

    const { exp } = this.jwtPayload;

    // exp is in seconds
    return new Date(exp * 1000);
  }

  @autoBind()
  private setHeaders(config: HttpRequestConfig) {
    if (!this.tokens?.accessToken) return config;
    if (!config.headers) config.headers = {};

    config.headers.Authorization = `Bearer ${this.tokens.accessToken}`;

    return config;
  }

  @autoBind()
  private async refreshIfNeeded(config: HttpRequestConfig) {
    if (!config.url) return config;
    if (REFRESH_EXCLUDED_URLS.includes(config.url)) return config;

    const exp = this.tokenExpirationDate;
    if (!exp) return config;

    const isExpired = isBefore(exp, new Date());
    if (!isExpired) return config;

    await this.refresh();

    return config;
  }

  @autoBind()
  private async refresh() {
    if (!this.tokens?.refreshToken) return;
    // make a new refresh request only if the tokens are not already being refreshed
    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        if (!this.tokens) return;

        this.tokens = await this.strategy.handleRefresh(
          this.tokens.refreshToken
        );
        this.refreshPromise = null;
      })();
    }

    return this.refreshPromise;
  }

  @autoBind()
  async authenticate() {
    if (!this.jwtPayload) return null;
    try {
      const userDto = await this.http.get<UserDto>(
        `${endpoints.USERS}/${this.jwtPayload.id}`
      );
      this._currentUser = new User(userDto);

      return this._currentUser;
    } catch (err) {
      console.error(err);
      this.tokens = null;
      this._currentUser = null;

      return this._currentUser;
    }
  }

  get currentUser() {
    return this._currentUser;
  }

  @autoBind()
  async login(credentials: LoginCredentials) {
    this.tokens = await this.strategy.handleLogin(credentials);

    return (await this.authenticate()) as User;
  }

  @autoBind()
  logout() {
    this.tokens = null;

    return this.strategy.handleLogout();
  }
}
