const vue = require('eslint-plugin-vue');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ['client/src/**/*.vue', 'client/src/**/*.ts'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tseslint.parser,
        project: './client/tsconfig.json',
        tsconfigRootDir: '/home/m/projects/three-dog',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      vue,
    },
    ignores: ['**/*.d.ts'],
  },
  {
    extends: [...vue.configs['flat/recommended'], ...tseslint.configs.recommended, prettier],
  },
);
