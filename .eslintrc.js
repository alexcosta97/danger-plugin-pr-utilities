/* eslint-env node */
module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended' // configures eslint-config-prettier too
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-var': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'warn',
    'unicorn/filename-case': ['error', { case: 'camelCase' }],
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/prefer-string-replace-all': 'warn',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/prefer-at': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prevent-abbreviations': 'error',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }]
  },
  overrides: [
    {
      files: ['**/__tests__/*.ts?(x)', '**/*.test.ts?(x)', 'jest.config.js'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      rules: {
        'jest/require-hook': 0,
        'jest/max-expects': 0,
        '@typescript-eslint/unbound-method': 'off'
      }
    }
  ],
  root: true
};
