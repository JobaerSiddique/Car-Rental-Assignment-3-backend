import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: 
    { 
      globals: globals.node 
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
 {
  rules: {
    "no-unused-vars": "error",
    "no-undef": "error",
    "prefer-const": "error",
    "no-console": "warn",
}
 },
 {
  ignores: ["**/node_modules/", "**/dist/"],
 }
];