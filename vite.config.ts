import {
  mergeConfig, loadEnv, defineConfig, UserConfig,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import path from 'path';
import fs from 'fs';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import dts from 'vite-plugin-dts';

const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths);

const read = (...paths: string[]) => JSON.parse(fs.readFileSync(resolve(...paths), 'utf-8'));

export const commonConfig: UserConfig = {
  define: {
    __APP_VERSION__: JSON.stringify(read('package.json').version),
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

  const {
    peerDependencies = {},
    dependencies = {},
  } = read('package.json');

  const esDir = resolve('es');
  const distDir = resolve('dist');

  const { paths = {} } = read('tsconfig.json').compilerOptions;

  const directories = fs.readdirSync(resolve('node_modules/.pnpm'));
  const vueSharedDir = directories.find((dir) => /^@vue\+shared@\d+\.\d+\.\d+$/.test(dir));

  if (vueSharedDir) {
    Object.assign(paths, {
      // https://github.com/qmhc/vite-plugin-dts/blob/main/README.md#type-errors-that-are-unable-to-infer-types-from-packages-in-node_modules
      '@vue/shared': [`node_modules/.pnpm/${vueSharedDir}/node_modules/@vue/shared/dist/shared.esm-bundler.js`],
    });
  }

  return mergeConfig(
    commonConfig,
    {
      plugins: [
        dts({
          include: [
            'src',
            'types',
          ],
          outDir: esDir,
          staticImport: true,
          // 需开启，否则使用中无法正确识别组件
          cleanVueFileName: true,
          tsconfigPath: resolve('tsconfig.json'),
          compilerOptions: { paths },
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
          name: '@tanghongxin/vue3-amap',
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
          external: [
            ...Object.keys(peerDependencies),
            ...Object.keys(dependencies),
          ],
        },
      },
    },
    true,
  );
});
