// Using .cjs so we can use __dirname so both package.json scripts and VSCode extension works

module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,

    // not sure if this is a "bug" or "feature" in airBnB config? https://github.com/airbnb/javascript/issues/2505
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
      },
    ],

    // https://www.lloydatkinson.net/posts/2022/default-exports-in-javascript-modules-are-terrible/
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,

    // should be safe with TS
    'react/jsx-props-no-spreading': 0,

    // any === Evil
    '@typescript-eslint/no-explicit-any': 2,

    // TS rulez!
    'react/require-default-props': 0,
  },
  ignorePatterns: ['*.cjs'],
}
