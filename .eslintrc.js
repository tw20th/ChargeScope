/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['next', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript用のルール調整
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',

    // 必要に応じてここで require を許可
    '@typescript-eslint/no-require-imports': 'off',
  },
  overrides: [
    {
      files: ['scripts/**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
}
