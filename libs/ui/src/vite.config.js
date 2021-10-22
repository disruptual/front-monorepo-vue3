/**
 *
 * This vite config is used by vitepress for the documentation
 * Do not delete
 *
 */

import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@dsp/ui/styles/config.scss';`
      }
    }
  },
  resolve: {
    alias: {
      '@dsp/core': '@dsp/core/src',
      '@dsp/ui': '@dsp/ui/src',
      '@dsp/docs': '@dsp/docs/src',
      '@dsp/business': '@dsp/business/src',
      '@dsp/default-theme': '@dsp/default-theme/src',
      'vue-query/devtools': 'vue-query/devtools',
      'vue-query': '@dsp/core/src/libs/vue-query.js'
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
});
