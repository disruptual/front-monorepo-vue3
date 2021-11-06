import { reactive } from 'vue';
import { DisruptualApp } from '@dsp/core';
import { DisruptualUi } from '@dsp/ui';
import config from 'client/config.js';
import theme from 'client/theme.js';
import App from '@/app.vue';
import { routes } from '@/pages/routes';
import { translations } from '@/translations';
import { CONTEXT_KEYS } from '@/utils/constants';
import { Breadcrumbs } from '@/models/Breadcrumbs.model';

const app = new DisruptualApp({
  rootComponent: App,
  apiBaseUrl: import.meta.env.VITE_API_URL,
  appContext: config,
  plugins: [DisruptualUi(theme)],
  translations,
  routes
});

if (import.meta.env.VITE_DEVTOOLS) {
  import('@dsp/devtools').then(module => {
    module.createDevtools(app);
  });
}

function setupBreadcrumbs() {
  const breadcrumbs = reactive(new Breadcrumbs());

  app.vueApp.provide(CONTEXT_KEYS.BREADCRUMB, breadcrumbs);

  app.router.beforeEach((to, from, next) => {
    const [toDomain] = to.fullPath.split('/').filter(Boolean);
    const [fromDomain] = from.fullPath.split('/').filter(Boolean);

    if (toDomain !== fromDomain) breadcrumbs.reset();
    if (to.name === 'Home') breadcrumbs.reset();

    next();
  });
}

setupBreadcrumbs();
app.bootstrap('#app');
