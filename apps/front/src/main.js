import { DisruptualApp } from '@dsp/core';
import config from 'client/config.js';
import theme from 'client/theme.js';
import App from '@/app.vue';
import { routes } from '@/pages/routes';
import { translations } from './translations/index';
import { DisruptualUi } from '@dsp/ui';

const app = new DisruptualApp({
  rootComponent: App,
  apiBaseUrl: import.meta.env.VITE_API_URL,
  appContext: config,
  plugins: [DisruptualUi(theme)],
  translations,
  routes
});

async function setupDevtools() {
  if (!import.meta.env.VITE_DEVTOOLS) return;

  const devtools = await import('@dsp/devtools');

  return devtools.createDevtools(app);
}

async function start() {
  await setupDevtools();

  app.bootstrap('#app');
}

start();
