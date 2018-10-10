const fs = require('fs')

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'))

module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'prettier'],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': ['off'],
    'class-methods-use-this': 'off',
    'compat/compat': 'error',
    'consistent-return': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'generator-star-spacing': 'off',
    'import/newline-after-import': 'warn',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'promise/param-names': 'error',
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'prefer-template': 2,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
  plugins: ['prettier', 'import', 'promise', 'compat'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.conf.js',
      },
    },
  },
}
