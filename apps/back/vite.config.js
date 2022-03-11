import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteESLint from '@ehutch79/vite-eslint';
import legacy from '@vitejs/plugin-legacy';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import dotenv from 'dotenv';
import path from 'path';
import Markdown from 'vite-plugin-md';
import { visualizer } from 'rollup-plugin-visualizer';
import svgLoader from 'vite-svg-loader';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown(),
    svgLoader(),
    viteESLint(),
    minifyHtml(),
    injectHtml({
      injectData: {
        favicon16x16: `/src/clients/${process.env.CLIENT}/assets/favicons/favicon-16x16.png`,
        favicon32x32: `/src/clients/${process.env.CLIENT}/assets/favicons/favicon-32x32.png`,
        apiURL: process.env.VITE_API_URL
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@dsp/ui/styles/config.scss';`
      }
    }
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      '@dsp/core': '@dsp/core/src',
      '@dsp/ui': '@dsp/ui/src',
      '@dsp/business': '@dsp/business/src',
      '@dsp/default-theme': '@dsp/default-theme/src',
      '@dsp/devtools': '@dsp/devtools/src',
      'vue-query/devtools': 'vue-query/devtools',
      'vue-query': '@dsp/core/src/libs/vue-query.js',
      client: `${__dirname}/src/clients/${process.env.VITE_CLIENT}`
    }
  },
  build: {
    target: 'es2015',
    sourcemap: true,
    rollupOptions: {
      plugins: [visualizer()]
    },
    minify: false
  },
  server: {
    fs: {
      strict: false
    }
  }
});
