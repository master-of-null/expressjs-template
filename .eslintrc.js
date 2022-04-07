module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  plugins: ['security', 'prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'func-names': 'off',
    'no-return-await': 'off',
    'no-console': 'error',
    'consistent-return': 'off',
    'security/detect-object-injection': 'off'
  },
  overrides: [
    {
      files: ['__tests__/**'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
}
