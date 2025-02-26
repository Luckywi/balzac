import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Désactiver les avertissements pour l'utilisation de 'any'
      "@typescript-eslint/no-explicit-any": "off",
      // Ou vous pouvez utiliser 'warn' au lieu de 'off' pour avoir juste un avertissement sans erreur
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;