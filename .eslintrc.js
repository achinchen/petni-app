module.exports = {
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    '@remix-run/eslint-config',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        wrapWidth: 80
      }
    ]
  }
};
