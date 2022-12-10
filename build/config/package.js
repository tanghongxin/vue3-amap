import { resolve } from 'path';
import copy from '../plugins/copy';

/**
 * @type {() => import('vite').UserConfigExport}
 */
export default ({ watch }) => ({
  plugins: [copy()],
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, '../../packages/index.js'),
      name: 'vue3-amap',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
    },
    watch: watch ? {} : null,
  },
});
