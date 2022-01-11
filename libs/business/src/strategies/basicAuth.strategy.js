import jwtDecode from 'jwt-decode';
import { isBefore } from 'date-fns';

const REFRESH_EXCLUDED_URLS = ['/login', '/token/refresh'];
const LOCAL_STORAGE_KEY = 'dsp_basic_refresh_token';

export class BasicAuthStrategy {
  constructor({ http }) {
    this._http = http;
    this._accessToken = null;
    this._refreshPromise = null;
    this._http
      .onRequest(this._refreshIfNeeded.bind(this))
      .onRequest(this._setHeaders.bind(this));
  }

  get _refreshToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  set _refreshToken(val) {
    if (!val) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, val);
    }
  }

  get _jwtPayload() {
    if (!this._accessToken) return null;

    return jwtDecode(this._accessToken);
  }

  get _tokenExpirationDate() {
    if (!this._jwtPayload) return null;

    const { exp } = this._jwtPayload;
    // exp is in seconds
    return new Date(exp * 1000);
  }

  get currentUserId() {
    if (!this._jwtPayload) return null;

    const { id } = this._jwtPayload;

    return id;
  }

  async _refreshIfNeeded(config) {
    if (REFRESH_EXCLUDED_URLS.includes(config.url)) return config;

    const exp = this._tokenExpirationDate;
    const isExpired = isBefore(exp, new Date());
    if (!isExpired) return config;

    await this.handleRefresh();

    return config;
  }

  _setHeaders(config) {
    if (!this._accessToken) return config;
    if (!config.headers) config.headers = {};

    if (this._accessToken) {
      config.headers.Authorization = `Bearer ${this._accessToken}`;
    }

    return config;
  }

  async _performRequest(url, data) {
    try {
      const { token, refresh_token } = await this._http.post(url, { data });
      this._accessToken = token;
      this._refreshToken = refresh_token;
    } catch (err) {
      this._refreshToken = null;
      this._accessToken = null;

      throw err;
    }
  }

  async _refresh() {
    await this._performRequest('/token/refresh', {
      refresh_token: this._refreshToken
    });

    this._refreshPromise = null;
  }

  async handleRefresh() {
    if (!this._refreshToken) return;
    if (!this._refreshPromise) {
      this._refreshPromise = this._refresh();
    }

    return this._refreshPromise;
  }

  async handleLogin(credentials) {
    return this._performRequest('/login', credentials);
  }

  async handleLogout() {
    this._accessToken = null;
    this._refreshToken = null;
  }

  authenticate() {
    if (!this.currentUserId) return Promise.resolve(null);

    return this._http.get(`/users/${this.currentUserId}`);
  }

  async handleInit() {
    await this.handleRefresh();
    const currentUser = await this.authenticate();

    return { currentUser };
  }

  getTokens() {
    return { accessToken: this._accessToken };
  }
}
