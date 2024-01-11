import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import promise from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "eslint.config.js"],
  },

  js.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      import: importPlugin,
      perfectionist,
      promise,
      sonarjs,
      unicorn,
    },

    rules: {
      // Keep TypeScript APIs explicit and predictable.
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      // Catch async bugs where promises are easy to lose or misuse.
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
      "promise/prefer-await-to-then": "error",

      // Prefer modern, concise JavaScript and TypeScript syntax.
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "arrow-body-style": ["error", "as-needed"],
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-unneeded-ternary": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "prefer-const": "error",
      "prefer-template": "error",
      "template-curly-spacing": ["error", "never"],

      // Keep imports and object-like structures stable in diffs.
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/no-cycle": "error",
      "no-duplicate-imports": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],

      // Limit complexity so handlers and services stay reviewable.
      "@typescript-eslint/no-unnecessary-condition": "error",
      "max-depth": ["error", 4],
      "max-lines-per-function": [
        "error",
        {
          max: 80,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "no-nested-ternary": "error",
      "no-restricted-syntax": [
        "error",
        {
          message: "Use Object.keys/Object.entries instead.",
          selector: "ForInStatement",
        },
      ],
      "sonarjs/cognitive-complexity": ["error", 10],

      // Enforce project conventions that are easy to miss in review.
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "sonarjs/no-duplicate-string": [
        "error",
        {
          threshold: 3,
        },
      ],
      "unicorn/explicit-length-check": "error",
      "unicorn/error-message": "error",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
      "unicorn/no-array-for-each": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-top-level-await": "error",
      "unicorn/prevent-abbreviations": "off",
    },
  },

  eslintConfigPrettier,
];
