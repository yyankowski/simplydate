module.exports = {
	'parser': '@typescript-eslint/parser',
	'plugins': ['@typescript-eslint'],
	'rules': {
		'semi': ['error', 'always'],
		'quotes': [2, 'single'],
		'@typescript-eslint/consistent-type-assertions': 'warn',
		'no-array-constructor': 'off',
		'@typescript-eslint/no-array-constructor': 'warn',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': [
			'warn',
			{
				functions: false,
				classes: false,
				variables: false,
				typedefs: false,
			},
		],
		'no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
			},
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		'object-curly-spacing': ['error', 'always'],
		'indent': ['error', 'tab'],
	},
};
