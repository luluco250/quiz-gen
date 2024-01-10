import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
import path from "node:path";
import url from "node:url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const flatCompat = new FlatCompat({
	baseDirectory: dirname,
	resolvePluginsRelativeTo: dirname,
	recommendedConfig: eslintJs.configs.recommended,
	allConfig: eslintJs.configs.all,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	eslintJs.configs.recommended,
	{
		rules: {
			"func-style": ["warn", "declaration"],
		},
	},
	...flatCompat.config({
		extends: [
			"eslint:recommended",
			"plugin:css-modules/recommended",
			"plugin:@typescript-eslint/recommended-type-checked",
		],
		plugins: ["css-modules", "@typescript-eslint"],
		parser: "@typescript-eslint/parser",
		overrides: [
			{
				files: ["*.ts", "*.tsx"],
				parserOptions: {
					project: ["./tsconfig.json"],
				},
			},
		],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/explicit-member-accessibility": "warn",
		},
	}),
];
