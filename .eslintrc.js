module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/all',
    'plugin:jest-formatting/strict',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'jest-formatting', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        custom: {
          match: true,
          regex: '^I[A-Z]',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    camelcase: 'error',
    curly: 'error',
    eqeqeq: 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'jest/lowercase-name': ['off', { ignore: ['describe'] }],
    'jest/no-expect-resolves': 'off',
    'jest/no-hooks': 'off',
    'jest/prefer-expect-assertions': 'off',
    'new-cap': 'error',
    'newline-before-return': 'error',
    'no-shadow': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'sort-keys': 'error',
    'spaced-comment': 'error',
  },
}
