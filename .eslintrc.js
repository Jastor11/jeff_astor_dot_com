module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb-base", "prettier"],
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "no-console": "off",
    "no-else-return": "off",
    "no-plusplus": "off",
    "no-use-before-define": ["error", { functions: false }],
    "object-curly-newline": "off",
    "operator-linebreak": ["error", "after"],
    semi: "off",
  },
  settings: {
    // "import/core-modules": [],
    "import/resolver": {
      alias: [
        ["assets", "./src/assets/*"],
        ["components", "./src/components/*"],
        ["config", "./config"],
        ["hooks", "./src/hooks"],
        ["images", "./src/images"],
        ["layout", "./src/layout"],
        ["models", "./src/models"],
        ["pages", "./src/pages"],
        ["services", "./src/services"],
        ["utils", "./src/utils"],
      ],
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
}
