import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteESLint from '@ehutch79/vite-eslint';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import path from 'path';

const srcPath = path.join(process.cwd(), 'src');

export default defineConfig({
  plugins: [vue(), viteESLint()],
  resolve: {
    alias: {
      '@dsp/core': srcPath,
      'vue-query': path.join(srcPath, 'libs/vue-query.js')
    }
  },
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    watch: true,
    lib: {
      entry: path.resolve(srcPath, 'index.js'),
      formats: ['es'],
      name: 'DisruptualCode',
      fileName: format => `disruptual-core.${format}.js`
    },
    rollupOptions: {
      plugins: [peerDepsExternal()],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
