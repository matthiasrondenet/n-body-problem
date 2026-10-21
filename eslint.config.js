import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwindcss from "eslint-plugin-tailwindcss";

export default tseslint.config(
  { ignores: ["dist", "node_modules", ".vite-react-ssg-temp"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      tailwindcss: { cssConfigPath: "./src/index.css" },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      tailwindcss,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...(tailwindcss.configs["flat/recommended"] ?? tailwindcss.configs.recommended).rules,
      "tailwindcss/no-custom-classname": ["warn", { whitelist: ["active", "origin-top-center"] }],
      // Relax some strict rules
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  {
    // false positive: `cn(...inputs)` spreads a ClassValue[] param
    files: ["src/lib/utils.ts"],
    rules: { "tailwindcss/no-custom-classname": "off" },
  }
);
