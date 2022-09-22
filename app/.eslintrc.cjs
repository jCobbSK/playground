// Using .cjs so we can use __dirname so both package.json scripts and VSCode extension works

module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
  },
  ignorePatterns: ['*.cjs'],
}
