import { IAuth } from '@/interfaces/auth.interface';
import { IHttp } from '@/interfaces/http.interface';
import { AxiosRequestConfig } from 'axios';
import { Endpoint, URI } from '..';
import { LoginCredentials } from './auth.service';

export type DisruptualClientOptions = {
  http: IHttp;
  auth: IAuth;
};

export class DisruptualClient {
  private http: IHttp;
  private auth: IAuth;

  constructor({ http, auth }: DisruptualClientOptions) {
    this.http = http;
    this.auth = auth;
  }

  httpRequest<T>(url: Endpoint, config: AxiosRequestConfig) {
    return this.http.get<T>(url, config);
  }

  login(credentials: LoginCredentials) {
    return this.auth.login(credentials);
  }

  logout() {
    return this.auth.logout();
  }
}
