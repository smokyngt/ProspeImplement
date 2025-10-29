// eslint.config.js
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";


export default [
  // Ignorer les sorties et fichiers de config globaux
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "**/node_modules/**",
      "eslint.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "vite.config.*",
    ],
  },

  // Fichiers à prendre en compte
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
  },

  // JS de base
  js.configs.recommended,

  // TypeScript (sans et AVEC type information)
  // recommended-type-checked active les règles qui ont besoin des types
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map(cfg => ({
    ...cfg,
    languageOptions: {
      ...cfg.languageOptions,
      parserOptions: {
        // ⚠️ IMPORTANT : dites à ESLint comment récupérer les types
        // - project: true => auto-détecte tsconfig.* à la racine
        //   (ou remplace par: project: ["./tsconfig.json", "./tsconfig.eslint.json"])
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })),

  // React + Hooks
  react.configs.flat.recommended,
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
  // Les prop-types ne sont pas utiles avec TypeScript
  "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" }, // auto-détection
    },
  },

  // Contexte global du navigateur
  { languageOptions: { globals: globals.browser } },

  // Règles supplémentaires utiles pour “mieux typer”
  {
    rules: {
      // Encourage l’API moderne JSX
      "react/react-in-jsx-scope": "off",

      // Typage plus strict côté TS
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true, allowBoolean: true }],
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
    },
  },
];
