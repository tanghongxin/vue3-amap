import { mergeConfig, loadEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';

/**
 * @type {import('vite').UserConfigExport}
 */
export const commonConfig = {
  plugins: [
    eslint({
      cache: false,
      exclude: ['**/node_modules/**', '**/lib/**'],
    }),
    svgLoader(),
    vue(),
  ],
  resolve: {
    alias: {
      'vue3-amap/constants': resolve(__dirname, 'constants/index.js'),
      'vue3-amap': resolve(__dirname, 'components/index.js'),
    },
  },
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
          entry: resolve(__dirname, './components/index.js'),
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
