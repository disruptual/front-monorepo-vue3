import { Endpoint, MaybeAsync } from '@/utils/types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpRequestConfig = Pick<
  AxiosRequestConfig,
  'url' | 'headers' | 'params' | 'data' | 'method'
>;

export type HttpRequest = <T = unknown>(
  url: Endpoint,
  config?: HttpRequestConfig
) => Promise<T>;

export interface IHttp {
  get: HttpRequest;
  post: HttpRequest;
  put: HttpRequest;
  delete: HttpRequest;
  onRequest: (
    cb: (config: HttpRequestConfig) => MaybeAsync<HttpRequestConfig>
  ) => IHttp;
  onResponse: (
    cb: (config: AxiosResponse) => MaybeAsync<AxiosResponse>
  ) => IHttp;
}
