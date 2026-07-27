const tseslint = require('typescript-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    ignores: ['.eslintrc.js', 'webpack-hmr.config.js'],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      globals: {
        node: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    extends: [...tseslint.configs.recommended, prettier],
  },
);
