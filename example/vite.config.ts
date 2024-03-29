import { resolve } from 'path';
// FIXME
import { mergeConfig, loadEnv, defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import viteCompression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { commonConfig } from '../vite.config';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return mergeConfig(
    commonConfig,
    {
      base: '/vue3-amap/',
      plugins: [
        basicSsl(),
        Components({
          dts: true,
          resolvers: [
            AntDesignVueResolver({
              importStyle: false, // css in js
            }),
          ],
        }),
        ...mode === 'production' ? [viteCompression()] : [],
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
          'axios/lib/adapters/xhr': resolve(__dirname, '../node_modules/axios/lib/adapters/xhr.js'),
          'vue3-amap': resolve(__dirname, '../src/index.ts'),
        },
      },
      server: {
        https: true,
        proxy: {
          '/_AMapService': {
            target: 'https://www.ado.icu',
            changeOrigin: true,
          },
          '/geofence': {
            target: 'https://www.ado.icu',
            changeOrigin: true,
          },
          '/inputtips': {
            target: 'https://www.ado.icu',
            changeOrigin: true,
          },
        },
      },
    },
    true,
  );
});
