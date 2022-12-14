module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:node/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["*.cjs"],
  rules: {
    "max-len": [
      "error",
      {
        code: 100,
      },
    ],
    "comma-dangle": ["warn", "always-multiline"],
    "no-console": 0,
    "no-extra-boolean-cast": 0,
    semi: 1,
    indent: ["warn", 2],
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "node/no-process-env": 0,
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "node/no-missing-import": 0,
    "node/no-unpublished-import": 0,
  },
  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts"],
    },
  },
};
