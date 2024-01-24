module.exports = {
	root: true,
	extends: [
		'next/core-web-vitals',
		'plugin:sonarjs/recommended',
		'plugin:jsx-a11y/recommended',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	plugins: ['react', 'react-hooks', 'eslint-plugin-simple-import-sort'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		es6: true,
		browser: true,
		jest: true,
		node: true,
	},
	rules: {
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1,
		'newline-before-return': 2,
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 0,

		'no-console': [
			2,
			{
				allow: ['warn', 'error'],
			},
		],
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				singleQuote: true,
				tabWidth: 2,
				endOfLine: 'auto',
			},
		],
		'jsx-a11y/anchor-is-valid': [
			'error',
			{
				components: ['Link'],
				specialLink: ['hrefLeft', 'hrefRight'],
				aspects: ['invalidHref', 'preferButton'],
			},
		],
		'sonarjs/cognitive-complexity': 'warn',
		'sonarjs/no-identical-expressions': 'warn',
		'sonarjs/no-duplicate-string': 'warn',
	},
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							['^react', '^next'],
							['@/app/ui/(.*)$', '../ui/(.*)$', '../../ui/(.*)$'],
							['@chakra-ui/(.*)$'],
							['@/app/lib/(.*)$', '../lib/(.*)$', '../../lib/(.*)$'],
							['^\\u0000'],
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							['^.+\\.?(css)$'],
						],
					},
				],
			},
		},
	],
	ignorePatterns: ['!.*', 'dist', 'node_modules'],
};
