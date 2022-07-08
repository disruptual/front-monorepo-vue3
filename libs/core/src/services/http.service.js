import axios, { CancelToken } from 'axios';
import { HTTP_VERBS } from '../utils/constants';
import { createLogger } from '@dsp/core/factories/logger.factory';

export class HttpService {
  constructor({ baseURL }) {
    this.logger = createLogger('http');
    this.axios = axios.create({
      baseURL,
      responseType: 'json',
      withCredentials: true
    });

    this.axios.defaults.headers.post['Content-Type'] = 'application/json';
    this.axios.defaults.headers.put['Content-Type'] = 'application/json';
    this.axios.defaults.headers.patch['Content-Type'] = 'application/json';

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  async makeRequest(url, config) {
    // this.logger.debug(`${config.method.toUpperCase()}${url}`);
    const { cancel, token } = CancelToken.source();

    const promise = this.axios(url, { cancelToken: token, ...config });
    promise.cancel = cancel;

    const response = await promise;

    return response.data;
  }

  onRequest(cb) {
    this.axios.interceptors.request.use(cb);

    return this;
  }

  onResponse(cb) {
    this.axios.interceptors.response.use(cb);

    return this;
  }

  get(url, config = {}) {
    return this.makeRequest(url, {
      method: HTTP_VERBS.GET,
      ...config
    });
  }

  post(url, config = {}) {
    return this.makeRequest(url, { method: HTTP_VERBS.POST, ...config });
  }

  put(url, config = {}) {
    return this.makeRequest(url, { method: HTTP_VERBS.PUT, ...config });
  }

  delete(url, config = {}) {
    return this.makeRequest(url, { method: HTTP_VERBS.DELETE, ...config });
  }
}
