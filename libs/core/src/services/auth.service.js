import mitt from 'mitt';

export const ON_TOKEN_UPDATE = 'onTokenUpdate';
export const ON_AUTH_READY = 'onAuthReady';

export class AuthService {
  constructor({ strategy, queryClient, router }) {
    this._strategy = strategy;
    this._emitter = mitt();
    this._queryClient = queryClient;
    this._isInitialized = false;
    this._router = router;

    this._bindMethods();
    this._router.beforeEach(this._checkAuthentication.bind(this));
    this.initPromise = null;
  }

  _bindMethods() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.refresh = this.refresh.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.init = this.init.bind(this);
    this.on = this.on.bind(this);
  }

  async _checkAuthentication(to, from, next) {
    await this.init();

    const currentUser = this._queryClient.getQueryData('currentUser');

    const { permissions } = to.meta;

    if (!permissions) return next();
    if (permissions.length === 0) {
      return next(currentUser ? from : null);
    }
    const isAllowed = permissions.some(permission =>
      currentUser?.roles.includes(permission)
    );

    if (!isAllowed) {
      return next({ name: 'Login', query: { from: to.fullPath } });
    }

    return next();
  }

  on(eventName, cb) {
    return this._emitter.on(eventName, cb);
  }

  getTokens() {
    return this._strategy.getTokens();
  }

  async authenticate() {
    const currentUser = await this._strategy.authenticate();
    this._queryClient.setQueryData('currentUser', currentUser);
  }

  async login(credentials) {
    const payload = await this._strategy.handleLogin(credentials);
    this._emitter.emit(ON_TOKEN_UPDATE, payload);
  }

  async logout(credentials) {
    await this._strategy.handleLogout(credentials);

    this._queryClient.setQueryData('currentUser', null);
    this._emitter.emit(ON_TOKEN_UPDATE, null);
  }

  async refresh() {
    const payload = this._strategy.handleRefresh();

    this._emitter.emit(ON_TOKEN_UPDATE, payload);
  }

  async init() {
    if (this._isInitialized) return;
    const queryResults = await this._strategy.handleInit();

    Object.entries(queryResults).forEach(([key, data]) => {
      this._queryClient.setQueryData(key, data);
    });

    this._isInitialized = true;
    this._emitter.emit(ON_AUTH_READY);
  }
}
