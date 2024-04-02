import {
  mergeConfig, loadEnv, defineConfig, UserConfigExport,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';

export const commonConfig: UserConfigExport = {
  define: {
    // eslint-disable-next-line global-require
    __VERSION__: JSON.stringify(require('./package.json').version),
  },
  plugins: [
    eslint({
      cache: false,
      exclude: [
        '**/node_modules/**',
        '**/lib/**',
        '**/dist/**',
        './types/amap-jsapi-plugins-types/**',
      ],
    }),
    svgLoader(),
    vue(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
};

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return mergeConfig(
    commonConfig,
    {
      build: {
        emptyOutDir: true,
        copyPublicDir: false,
        outDir: resolve(__dirname, './lib'),
        sourcemap: true,
        lib: {
          entry: resolve(__dirname, './src/index.ts'),
          name: 'vue3-amap',
          formats: ['es'],
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          external: ['vue'],
        },
      },
    },
    true,
  );
});
