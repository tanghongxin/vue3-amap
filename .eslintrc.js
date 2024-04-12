module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  globals: {
    AMap: 'writable',
    __APP_VERSION__: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['error', {
      code: 160,
      ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"', // ignore classes or svg draw attributes
      ignoreUrls: true,
    }],
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 3,
      },
    }],
    'no-constructor-return': 'off',
    'class-methods-use-this': 'off',
    'vue/no-unused-components': [1],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-bitwise': 'off',
    'func-names': 'off',
    'prefer-promise-reject-errors': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/2483
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error', {
      allow: [
        'private-constructors',
        'protected-constructors',
      ],
    }],
  },
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
};
