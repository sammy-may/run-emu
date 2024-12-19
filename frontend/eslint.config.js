import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            // Indentation rule - set to 4 spaces
            indent: ["error", 4],

            // Sort imports rule - ensure imports are sorted
            "import/order": [
                "error",
                {
                    groups: [
                        ["builtin", "external"],
                        "internal",
                        ["parent", "sibling", "index"],
                    ],
                    "newlines-between": "always",
                },
            ],
        },
    }
);
