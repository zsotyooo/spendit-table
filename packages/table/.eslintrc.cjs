module.exports = {
  root: true,
  extends: ["@spendit/eslint-config-custom", "plugin:storybook/recommended"],
  ignorePatterns: ["dist", "storybook", "storybook-static"],
  overrides: [
    {
      files: ["*.spec.{ts,tsx}"],
      rules: {
        "sonarjs/no-duplicate-string": "off",
      },
    },
  ],
};
