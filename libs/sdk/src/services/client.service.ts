import { Cart } from '@/entities/cart.entity';
import { IAuth } from '@/interfaces/auth.interface';
import { IHttp } from '@/interfaces/http.interface';
import { endpoints } from '@/utils/enums';
import { Endpoint, Maybe } from '@/utils/types';
import { AxiosRequestConfig } from 'axios';
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

  async getCarts(): Promise<Maybe<Cart[]>> {
    const currentUser = await this.auth.getCurrentUser();
    if (!currentUser) return null;

    const response = await this.http.get(`${currentUser.uri}/carts`);
    return response['hydra:member'];
  }
}
