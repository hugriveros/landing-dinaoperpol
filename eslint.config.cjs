module.exports = [
  // Ignore common build/output folders
  {
    ignores: ["dist/**", "node_modules/**", "public/**"]
  },

  // Lint source files
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
    // NOTE: not using `extends` because this is a flat config; define a minimal, safe rule-set
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y")
    },
    settings: {
      react: { version: "detect" }
    },
    // Minimal rules to allow linting; project can expand these later or migrate presets.
    rules: {
      // keep common stylistic/SSG-safe rules
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-undef": "off"
    }
  }
];
