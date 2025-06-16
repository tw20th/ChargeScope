// functions/.eslintrc.js
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    sourceType: "module"
  },
  ignorePatterns: ["/lib/**/*", "/generated/**/*", ".eslintrc.js"],
  plugins: ["@typescript-eslint", "import", "prettier"],
  rules: {
    "prettier/prettier": "error",
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    "require-jsdoc": "off"
  },
  overrides: [
    {
      files: ["scripts/**/*.ts"],
      parserOptions: {
        project: null // ✅ 型チェックせずにLintだけ通す設定
      }
    }
  ]
};
