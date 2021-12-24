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
  routerBase: import.meta.env.VITE_BASE_PATH,
  translations,
  routes
});

async function setupDevtools() {
  if (!import.meta.env.VITE_DEVTOOLS) return;

  const devtools = await import('@dsp/devtools');
  devtools.createDevtools(app);
}

function setupBreadcrumbs() {
  const breadcrumbs = reactive(new Breadcrumbs());

  app.vueApp.provide(CONTEXT_KEYS.BREADCRUMB, breadcrumbs);

  app.router.beforeEach((to, from, next) => {
    const getDomain = route => route.fullPath.split('/').filter(Boolean);
    const [toDomain] = getDomain(to);
    const [fromDomain] = getDomain(from);

    if (toDomain !== fromDomain) breadcrumbs.reset();
    if (to.name === 'Home') breadcrumbs.reset();

    next();
  });
}

setupDevtools();
setupBreadcrumbs();
app.bootstrap('#app');
