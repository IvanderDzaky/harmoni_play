import js from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,     // process, console
        ...globals.browser   // URL
      }
    },
    plugins: {
      sonarjs
    },
    rules: {
      ...js.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules
    }
  }
];
