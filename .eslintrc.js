module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "standard-with-typescript",
    "plugin:react/recommended",
    "prettier"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
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
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    ecmaVersion: 2020,
    sourceType: "module",
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ["babel.config.js"],
  "plugins": [
    "react",
    "react-native",
    "react-hooks",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-exports": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    '@typescript-eslint/no-var-requires': "off",
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],


  }
}
