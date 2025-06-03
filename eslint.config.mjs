import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginTailwindCSS from "eslint-plugin-tailwindcss";
import pluginPrettier from "eslint-plugin-prettier";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create FlatCompat instance to convert legacy extends
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Final flat ESLint config
const eslintConfig = [
  // Include Next.js + TypeScript recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules added using new flat config style
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "unused-imports": pluginUnusedImports,
      "simple-import-sort": pluginSimpleImportSort,
      "tailwindcss": pluginTailwindCSS,
      "prettier": pluginPrettier,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "tailwindcss/classnames-order": "warn",
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
