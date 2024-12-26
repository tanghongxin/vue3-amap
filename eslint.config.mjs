import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettierConfig from '@vue/eslint-config-prettier';

const importRules = {
  'prefer-promise-reject-errors': 'off',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': 'off',
  'import/no-unresolved': 'off',
  'import/prefer-default-export': 'off',
};

const tsRules = {
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  '@typescript-eslint/no-useless-constructor': ['error'],
  '@typescript-eslint/no-empty-function': [
    'error',
    {
      allow: ['private-constructors', 'protected-constructors'],
    },
  ],
  '@typescript-eslint/triple-slash-reference': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
};

const vueRules = {
  'vue/multi-word-component-names': 'off',
  'vue/max-attributes-per-line': [
    'error',
    {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 3,
      },
    },
  ],
  'vue/no-unused-components': [1],
};

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'es/',
      'example/dist/',
      'types/amap/',
      '**/*.test.js',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        AMap: 'writable',
        __APP_VERSION__: true,
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: ts.parser,
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['./scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
          moduleDirectory: ['node_modules'],
        },
        alias: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
          map: [
            ['@rthx/vue3-amap', './src/index.ts'],
            ['@', './example/src'],
          ],
        },
      },
    },
    rules: {
      'class-methods-use-this': 'off',
      'func-names': 'off',
      'max-len': [
        'error',
        {
          code: 160,
          ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"', // ignore classes or svg draw attributes
          ignoreUrls: true,
        },
      ],
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'no-bitwise': 'off',
      'no-constructor-return': 'off',
      'no-empty-function': 'off',
      // https://github.com/typescript-eslint/typescript-eslint/issues/2483
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'no-useless-constructor': 'off',
      ...importRules,
      ...tsRules,
      ...vueRules,
    },
  },
];
