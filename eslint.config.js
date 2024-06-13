import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {languageOptions: { globals: globals.browser },    
  rules: {
    'prettier/prettier': ['warn', {endOfLine: "auto"}],
  
  },},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];