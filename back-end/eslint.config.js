import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import sonarjs from "eslint-plugin-sonarjs";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import promise from "eslint-plugin-promise";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  js.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  unicorn.configs["flat/recommended"],

  sonarjs.configs.recommended,

  promise.configs["flat/recommended"],

  eslintConfigPrettier,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      perfectionist,
    },

    rules: {
      /*
       * TYPESCRIPT
       */

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],

      /*
       * IMPORTS
       */

      "import/no-cycle": "error",
      "import/no-default-export": "error",
      "import/order": "off",

      /*
       * PERFECTIONIST
       */

      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],

      "perfectionist/sort-objects": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],

      "perfectionist/sort-interfaces": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],

      /*
       * UNICORN
       */

      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],

      "unicorn/no-null": "off",

      /*
       * SONAR
       */

      "sonarjs/cognitive-complexity": ["error", 10],

      /*
       * GENERAL
       */

      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
);
