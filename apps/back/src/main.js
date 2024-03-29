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
import { createHead } from '@vueuse/head';

const app = new DisruptualApp({
  rootComponent: App,
  apiBaseUrl: import.meta.env.VITE_API_URL,
  appContext: config,
  plugins: [DisruptualUi(theme), createHead()],
  routerBase: import.meta.env.VITE_BASE_PATH,
  translations,
  routes
});

async function setupDevtools() {
  if (!import.meta.env.VITE_DEVTOOLS) return;

  const [schemas, devtools] = await Promise.all([
    import('./register-devtools'),
    import('@dsp/devtools')
  ]);

  return devtools.createDevtools(app, schemas);
}

function setupBreadcrumbs() {
  const breadcrumbsManager = reactive(new Breadcrumbs());

  app.vueApp.provide(CONTEXT_KEYS.BREADCRUMB, breadcrumbsManager);
  app.router.beforeEach((to, from, next) => {
    const getDomain = route => route.fullPath.split('/').filter(Boolean);
    const [toDomain] = getDomain(to);
    const [fromDomain] = getDomain(from);

    breadcrumbsManager.breadcrumbs.forEach((breadcrumb, index) => {
      if (breadcrumb.path !== to.path) return;
      if (breadcrumbsManager.breadcrumbs[index + 1]?.path === from.path) {
        breadcrumbsManager.goTo(breadcrumbsManager.breadcrumbs[index]?.id);
      }
    });

    if (toDomain !== fromDomain) breadcrumbsManager.reset();
    if (to.name === 'Home') breadcrumbsManager.reset();

    next();
  });
}

setupDevtools();
setupBreadcrumbs();
app.bootstrap('#app');
