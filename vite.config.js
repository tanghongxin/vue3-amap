import { mergeConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import basicSsl from '@vitejs/plugin-basic-ssl';
import packageConfig from './build/config/package';
import exampleConfig from './build/config/example';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  /**
   * @type {import('vite').UserConfigExport}
   */
  const commonConfig = {
    plugins: [
      basicSsl(),
      eslint({
        cache: false,
        exclude: ['**/node_modules/**', '**/lib/**'],
      }),
      svgLoader(),
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    resolve: {
      alias: {
        'vue3-amap': resolve(__dirname, 'lib'),
        packages: resolve(__dirname, 'packages'),
        example: resolve(__dirname, 'example'),
      },
    },
  };

  return mergeConfig(
    commonConfig,
    process.env.BUILD_TYPE === 'package' ? packageConfig({ watch: process.env.BUILD_WATCH === 'true' }) : exampleConfig(),
    true,
  );
};
