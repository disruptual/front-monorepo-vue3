import { ref } from 'vue';
import { DisruptualApp, makeRandomId } from '@dsp/core';
import { DisruptualUi } from '@dsp/ui';
import config from 'client/config.js';
import theme from 'client/theme.js';
import App from '@/app.vue';
import { routes } from '@/pages/routes';
import { translations } from '@/translations';
import { CONTEXT_KEYS } from '@/utils/constants';

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
  const breadcrumbs = ref([]);

  const goTo = id => {
    const index = breadcrumbs.value.findIndex(b => b.id === id);
    breadcrumbs.value = breadcrumbs.value.slice(0, index);
  };

  const reset = () => {
    breadcrumbs.value = [];
  };

  const add = ({ label, target }) => {
    breadcrumbs.value.push({
      id: makeRandomId(4),
      label,
      target
    });
  };

  const setActiveBreadcrumbLabel = label => {
    breadcrumbs.value[breadcrumbs.value.length - 1].label = label;
  };

  app.vueApp.provide(CONTEXT_KEYS.BREADCRUMB, [
    breadcrumbs,
    { reset, goTo, add, setActiveBreadcrumbLabel }
  ]);

  app.router.beforeEach((to, from, next) => {
    const [toDomain] = to.fullPath.split('/').filter(Boolean);
    const [fromDomain] = from.fullPath.split('/').filter(Boolean);

    if (toDomain !== fromDomain) reset();
    if (to.name === 'Home') reset();

    next();
  });
}

setupBreadcrumbs();
app.bootstrap('#app');
