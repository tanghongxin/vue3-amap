import { resolve } from 'path';

/**
 * @type {() => import('vite').UserConfigExport}
 */
export default () => ({
  root: resolve(__dirname, '../../example'),
  publicDir: resolve(__dirname, '../../example/public'),
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
    outDir: resolve(__dirname, '../../dist'),
  },
});
