import { DisruptualApp } from './index.js';

import App from './app.vue';

const app = new DisruptualApp({
  rootComponent: App,
  apiBaseUrl: import.meta.env.VITE_API_URL,
  appContext: {
    sso: {
      isEnabled: false
    }
  },
  routes: []
});

app.bootstrap('#app');
