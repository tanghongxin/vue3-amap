import { resolve } from 'path';

/**
 * @type {() => import('vite').UserConfigExport}
 */
export default () => ({
  base: '/vue3-amap/',
  server: {
    https: true,
    proxy: {
      '/_AMapService': {
        target: 'https://www.abyssal.site',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      'vue3-amap': resolve(__dirname, '../../lib/'),
    },
  },
});
