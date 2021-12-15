import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { httpVerbs } from '@/utils/enums';
import { IHttp } from '@/interfaces/http.interface';
import { autoBind } from '@/utils/decorators';
import { Endpoint, MaybeAsync } from '@/utils/types';

export type HttpServiceOptions = {
  baseURL: string;
};

export class HttpService implements IHttp {
  private axios!: AxiosInstance;

  constructor({ baseURL }: HttpServiceOptions) {
    this.axios = axios.create({
      baseURL,
      responseType: 'json',
      withCredentials: true
    });

    this.axios.defaults.headers.post['Content-Type'] = 'application/json';
    this.axios.defaults.headers.put['Content-Type'] = 'application/json';
    this.axios.defaults.headers.patch['Content-Type'] = 'application/json';
  }

  async makeRequest<T = any>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axios(url, { ...config });

    return response.data;
  }

  onRequest(
    cb: (config: AxiosRequestConfig) => MaybeAsync<AxiosRequestConfig>
  ) {
    this.axios.interceptors.request.use(cb);

    return this;
  }

  onResponse(cb: (config: AxiosResponse) => MaybeAsync<AxiosResponse>) {
    this.axios.interceptors.response.use(cb);

    return this;
  }

  @autoBind()
  get<T = any>(url: Endpoint, config = {}): Promise<T> {
    return this.makeRequest<T>(url, {
      method: httpVerbs.GET,
      ...config
    });
  }

  @autoBind()
  post<T = any>(url: Endpoint, config = {}): Promise<T> {
    return this.makeRequest<T>(url, { method: httpVerbs.POST, ...config });
  }

  @autoBind()
  put<T = any>(url: Endpoint, config = {}): Promise<T> {
    return this.makeRequest<T>(url, { method: httpVerbs.PUT, ...config });
  }

  @autoBind()
  delete<T = any>(url: Endpoint, config = {}): Promise<T> {
    return this.makeRequest<T>(url, { method: httpVerbs.DELETE, ...config });
  }
}
