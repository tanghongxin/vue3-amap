/* eslint-disable global-require */
import {
  mergeConfig, loadEnv, defineConfig, UserConfig,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import path from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import dts from 'vite-plugin-dts';

const resolve = (...paths: string[]) => path.resolve(...paths);

export const commonConfig: UserConfig = {
  define: {
    __APP_VERSION__: JSON.stringify(require('./package.json').version),
  },
  plugins: [
    eslint({
      cache: false,
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/es/**',
        './types/amap/**',
      ],
    }),
    svgLoader(),
    vue(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('example/src'),
      '~': resolve('src'),
    },
  },
};

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const esDir = resolve('es');
  const distDir = resolve('dist');

  return mergeConfig(
    commonConfig,
    {
      plugins: [
        dts({
          include: [
            'src/**',
            'types/**',
          ],
          outDir: esDir,
          staticImport: true,
          // 需开启，否则使用中无法正确识别组件
          cleanVueFileName: true,
          tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
        }),
      ],
      build: {
        emptyOutDir: true,
        copyPublicDir: false,
        sourcemap: false,
        outDir: distDir,
        lib: {
          entry: [
            resolve('src/index.ts'),
          ],
          name: 'vue3-amap',
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          output: [
            {
              format: 'es',
              entryFileNames: '[name].js',
              preserveModules: true,
              exports: undefined,
              dir: esDir,
              preserveModulesRoot: 'src',
            },
            {
              format: 'es',
              entryFileNames: '[name].js',
              preserveModules: false,
              exports: undefined,
              dir: distDir,
            },
          ],
          external: ['vue'],
        },
      },
    },
    true,
  );
});
