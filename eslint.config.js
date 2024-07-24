import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: {...globals.browser, ...globals.node} },
    rules: {
      "prettier/prettier": ["warn", { endOfLine: "auto" }],
    },
    plugins: {
      prettier: prettierPlugin,
    }
  },
  {
    ignores: ['node_modules', 'dist']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    
  }
];
