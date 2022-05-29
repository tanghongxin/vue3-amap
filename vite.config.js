import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      eslint({ cache: false }),
      svgLoader(),
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
        directoryAsNamespace: true,
        dirs: ['src/components'],
        dts: 'types/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      https: true,
      /**
       * FIXME:
       * 使用定位服务时，转发请求可能导致根据IP获取定位不准确（失败）
       * 且考虑服务器位置分布，转发可能有较大延迟或失败
       */
      // proxy: {
      //   '/_AMapService': {
      //     target: 'https://preview.abyssal.site',
      //     changeOrigin: true,
      //   },
      // },
    },
    build: {
      sourcemap: true,
    },
  });
};
