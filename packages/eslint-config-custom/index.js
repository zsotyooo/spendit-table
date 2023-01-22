module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "turbo"],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  "rules": {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": ["error", "double"],
    "no-duplicate-imports": "error"
  }
};