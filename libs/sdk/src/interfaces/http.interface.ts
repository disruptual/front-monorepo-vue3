import { Endpoint, MaybeAsync } from '@/utils/types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpRequest = <T = any>(
  url: Endpoint,
  config?: AxiosRequestConfig
) => Promise<T>;

export interface IHttp {
  get: HttpRequest;
  post: HttpRequest;
  put: HttpRequest;
  delete: HttpRequest;
  onRequest: (
    cb: (config: AxiosRequestConfig) => MaybeAsync<AxiosRequestConfig>
  ) => IHttp;
  onResponse: (
    cb: (config: AxiosResponse) => MaybeAsync<AxiosResponse>
  ) => IHttp;
}
