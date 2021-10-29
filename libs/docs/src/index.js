import '@dsp/ui/styles/main.scss';

import DefaultTheme from 'vitepress/theme';
import { QueryClient } from 'vue-query';
import { createStore } from '@dsp/core/factories/store.factory';
import { PROVIDER_KEYS } from '@dsp/core';
import { plugin } from '@dsp/ui/plugin';

import theme from '@dsp/default-theme';
import PropsParser from './components/props-parser.vue';
import EmitsParser from './components/emits-parser.vue';
import CodeExample from './components/code-example.vue';
import VariantSelector from './components/variant-selector.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    const store = createStore({});
    app.use(plugin(theme));
    app.use(store);

    app.component('PropsParser', PropsParser);
    app.component('EmitsParser', EmitsParser);
    app.component('CodeExample', CodeExample);
    app.component('VariantSelector', VariantSelector);
    app.provide(PROVIDER_KEYS.VUE_QUERY_CLIENT, new QueryClient());
    app.provide(PROVIDER_KEYS.APP_CONTEXT, {});
  }
};
