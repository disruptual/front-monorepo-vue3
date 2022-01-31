import { createApp } from 'vue';
import { HttpService } from './http.service';
import { createQueryClient } from '../factories/queryClient.factory';
import { createAuthProvider } from '../factories/authProvider.factory';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from '../factories/store.factory';
import { createI18n } from '@dsp/core/factories/i18n.factory';
import { PROVIDER_KEYS } from '../utils/constants';

export class DisruptualApp {
  constructor({
    apiBaseUrl,
    appContext,
    rootComponent,
    routes,
    routerBase = '/',
    translations,
    plugins
  } = {}) {
    this.routes = routes;
    this.appContext = appContext;

    this.http = new HttpService({ baseURL: apiBaseUrl });
    this.queryClient = createQueryClient();
    this.store = createStore(appContext);
    this.router = createRouter({
      history: createWebHistory(routerBase),
      routes: routes,
      scrollBehavior(to, from, savedPosition) {
        if (!to.hash) return;
        if (!from.name) {
          // wait until DOM is loaded
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ el: to.hash });
            }, 300);
          });
        }
        return { el: to.hash };
      }
    });
    this.auth = createAuthProvider({
      http: this.http,
      router: this.router,
      appContext: appContext,
      queryClient: this.queryClient
    });
    this.i18n = createI18n(translations);
    this.vueApp = createApp(rootComponent);

    this.plugins = [this.store, this.router, this.i18n, ...plugins];
  }

  async bootstrap(mountPoint) {
    this.addProviders();
    this.addPlugins();
    this.queryClient.mount();

    this.vueApp.mount(mountPoint);
  }

  addProviders() {
    this.vueApp.provide(PROVIDER_KEYS.APP, this);
    this.vueApp.provide(PROVIDER_KEYS.APP_CONTEXT, this.appContext);
    this.vueApp.provide(PROVIDER_KEYS.HTTP_SERVICE, this.http);
    this.vueApp.provide(PROVIDER_KEYS.AUTH_SERVICE, this.auth);
    this.vueApp.provide(PROVIDER_KEYS.VUE_QUERY_CLIENT, this.queryClient);
  }

  addPlugins() {
    this.plugins.forEach(plugin => this.vueApp.use(plugin));
  }
}
