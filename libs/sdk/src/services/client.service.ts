import { BaseDto } from '@/dtos/base.dto';
import { CartDto } from '@/dtos/cart.dto';
import { CollectionDto } from '@/dtos/collection.dto';
import { Cart } from '@/entities/cart.entity';
import { Collection } from '@/entities/collection.entity';
import { createEntity } from '@/factories/entity.factory';
import { IAuth } from '@/interfaces/auth.interface';
import { IBaseEntity } from '@/interfaces/base-entity.interface';
import { IHttp } from '@/interfaces/http.interface';
import { endpoints } from '@/utils/enums';
import { Endpoint, Maybe } from '@/utils/types';
import { AxiosRequestConfig } from 'axios';
import {
  AuthService,
  AuthServiceOptions,
  LoginCredentials,
  WithSSO
} from './auth.service';
import { HttpService } from './http.service';

export type DisruptualClientOptions = {
  http: IHttp;
  auth: IAuth;
};

export type CreateClientOptions = WithSSO<{
  baseURL: string;
}>;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class DisruptualClient {
  private http: IHttp;
  private auth: IAuth;

  private constructor({ http, auth }: DisruptualClientOptions) {
    this.http = http;
    this.auth = auth;
  }

  static instance: Maybe<DisruptualClient> = null;

  static create({ baseURL, sso, ssoOptions }: CreateClientOptions) {
    if (!DisruptualClient.instance) {
      const http = new HttpService({ baseURL });
      const auth = new AuthService({
        http,
        sso,
        ssoOptions
      } as AuthServiceOptions);

      DisruptualClient.instance = new DisruptualClient({ http, auth });
    }

    return DisruptualClient.instance;
  }

  async httpRequest<T extends IBaseEntity<any> | Collection<IBaseEntity<any>>>(
    url: Endpoint,
    config?: AxiosRequestConfig & { method?: Method | Lowercase<Method> }
  ): Promise<T> {
    const method = config?.method?.toLowerCase?.() || 'get';

    // @ts-ignore
    const dto = await this.http[method as keyof IHttp]<T>(url, config);

    // @ts-ignore
    return createEntity(dto) as T;
  }

  login(credentials: LoginCredentials) {
    return this.auth.login(credentials);
  }

  logout() {
    return this.auth.logout();
  }

  async getCarts(): Promise<Maybe<Collection<Cart>>> {
    const currentUser = await this.auth.getCurrentUser();
    if (!currentUser) return null;

    return this.httpRequest<Collection<Cart>>(`${currentUser.uri}/carts`, {});
  }
}
