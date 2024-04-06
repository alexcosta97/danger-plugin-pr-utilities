/* eslint-env node */
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const unicorn = require('eslint-plugin-unicorn');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const prettier = require('eslint-plugin-prettier');
const jest = require('eslint-plugin-jest');

module.exports = [
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
      unicorn,
      prettier
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true
      }
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'no-var': 'error',
      'no-unused-vars': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // 'import/first': 'error',
      // 'import/newline-after-import': 'error',
      // 'import/no-duplicates': 'error',
      // 'import/no-extraneous-dependencies': 'error',
      // 'import/no-named-as-default': 'warn',
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
    }
  },
  {
    files: ['src/**/*.spec.ts'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/require-hook': 0,
      'jest/max-expects': 0,
      '@typescript-eslint/unbound-method': 'off'
    }
  },
  { ignores: ['**/*.js'] }
];
