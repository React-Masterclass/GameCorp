module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:prettier/recommended',
      ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'no-shadow': 0,
  },
}
