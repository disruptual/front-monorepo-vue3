import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': `${__dirname}/src`
    }
  },
  build: {
    sourcemap: true
    // lib: {
    //   entry: path.resolve(__dirname, 'src/index.ts'),
    //   name: 'DariaUi',
    //   fileName: format => `index.${format}.js`
    // },
    // rollupOptions: {
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
  }
});
