module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: ['@typescript-eslint/parser', 'vue-eslint-parser'],
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['**/*.d.ts'],
};
