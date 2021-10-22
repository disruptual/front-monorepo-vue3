import { addSeconds, isBefore } from 'date-fns';
import { BasicAuthStrategy } from './basicAuth.strategy';
import { isLocal, SSO_URLS } from '@dsp/core';

const SSO_TOKEN_KEY = 'dsp_sso_access_token';
const SSO_TOKEN_EXPIRATION_KEY = 'dsp_sso_access_token_expires_at';
const SSO_REFRESH_TOKEN_KEY = 'dsp_sso_refresh_token';
const SSO_STATE_KEY = 'dsp_sso_state';

const SSO_REFRESH_BLACKLIST_URLS = [
  import.meta.env.VITE_SSO_TOKEN_URL,
  SSO_URLS.REFRESH,
  SSO_URLS.SSO_TOKEN,
  SSO_URLS.USER
].filter(Boolean);

export class SSOAuthStrategy extends BasicAuthStrategy {
  constructor({ http, router }) {
    super({ http, router });
    this._router = router;
    this._ssoRefreshToken = null;
    this.router.beforeEach(this._removeSensitiveQuery.bind(this));
  }

  get _ssoToken() {
    return localStorage.getItem(SSO_TOKEN_KEY);
  }

  set _ssoToken(val) {
    if (!val) {
      localStorage.removeItem(SSO_TOKEN_KEY);
    } else {
      localStorage.setItem(SSO_TOKEN_KEY, val);
    }
  }

  get _ssoTokenExpiresAt() {
    return Number(localStorage.getItem(SSO_TOKEN_EXPIRATION_KEY));
  }

  set _ssoTokenExpiresAt(val) {
    if (!val) {
      localStorage.removeItem(SSO_TOKEN_EXPIRATION_KEY);
    } else {
      localStorage.setItem(SSO_TOKEN_EXPIRATION_KEY, val);
    }
  }

  get _ssoState() {
    return localStorage.getItem(SSO_STATE_KEY);
  }

  set _ssoState(val) {
    if (!val) {
      localStorage.removeItem(SSO_STATE_KEY);
    } else {
      localStorage.setItem(SSO_STATE_KEY, val);
    }
  }

  get _ssoRefreshToken() {
    return localStorage.getItem(SSO_REFRESH_TOKEN_KEY);
  }

  set _ssoRefreshToken(val) {
    if (!val) {
      localStorage.removeItem(SSO_REFRESH_TOKEN_KEY);
    } else {
      localStorage.setItem(SSO_REFRESH_TOKEN_KEY, val);
    }
  }

  async _removeSensitiveQuery(to, from, next) {
    const { code, state, ...query } = to.query;
    if (code || state) {
      return next({ ...to, query });
    }

    return next();
  }

  async _refreshIfNeeded(config) {
    await super._refreshIfNeeded(config); // refresh disruptual own refresh token if needed

    if (!this._ssoTokenExpiresAt) return config;
    if (!this._ssoToken) return config;
    if (!this._ssoRefreshToken) return config;
    if (SSO_REFRESH_BLACKLIST_URLS.includes(config.url)) return config;

    const isExpired = isBefore(new Date(this._ssoTokenExpiresAt), new Date());
    if (!isExpired) return config;

    await this.handleSSORefresh();

    return config;
  }

  async _ssoRefresh() {
    await this._performRequest(SSO_URLS.REFRESH, {
      token: this._ssoRefreshToken
    });

    this._ssoRefreshPromise = null;
  }

  async _performSSORequest(url, data) {
    try {
      const { access_token, refresh_token, expires_in } = await this._http.post(
        url,
        { data }
      );

      this._ssoToken = access_token;
      this._ssoRefreshToken = refresh_token;

      const now = new Date(Date.now());
      this._ssoTokenExpiresAt = addSeconds(now, expires_in).getTime();

      return this._ssoToken;
    } catch (err) {
      this._ssoRefreshToken = null;
      this._ssoToken = null;

      return null;
    }
  }

  _checkSsoState(queryString) {
    // skip check in local environment:
    // the SSO provider might redirect on the sandbox url, which means we wouldn't have the state in the localhost url
    if (isLocal) return true;

    const state = queryString.get('state');
    const isValid = state && state === this._ssoState;
    this._ssoState = null;

    return isValid;
  }

  async _getSsoToken() {
    const query = new URLSearchParams(window.location.search);
    if (!query.has('code')) return;

    const code = query.get('code');

    const isStateValid = this._checkSsoState(query);
    if (!isStateValid) return;

    return this._performSSORequest(SSO_URLS.SSO_TOKEN, { code });
  }

  async _getSsoUser() {
    if (!this._ssoToken) return null;

    return this._performRequest(SSO_URLS.USER, {
      token: this._ssoToken
    });
  }

  async _init() {
    await this._getSsoToken();
    await this.handleLogin();

    const currentUser = await this.authenticate();
    const ssoUser = currentUser ? null : await this._getSsoUser();

    return {
      currentUser,
      ssoUser
    };
  }

  async handleSsoRefresh() {
    if (!this._ssoRefreshToken) return;
    if (!this._ssoRefreshPromise) {
      this._ssoRefreshPromise = this._ssoRefresh();
    }

    return this._ssoRefreshPromise;
  }

  async handleLogin() {
    if (!this._ssoToken) return;

    return this._performRequest(SSO_URLS.LOGIN, {
      token: this._ssoToken
    });
  }

  async handleLogout() {
    this._ssoToken = null;
    this._ssoRefreshToken = null;
    this._ssoTokenExpiresAt = null;

    return super.handleLogout();
  }

  getTokens() {
    return {
      accessToken: this._accessToken,
      ssoToken: this._ssoToken
    };
  }
}
