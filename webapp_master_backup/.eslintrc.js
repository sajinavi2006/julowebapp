module.exports = {
	root: true,
	env: { node: true },
	extends: ['plugin:vue/essential', '@vue/standard', '@vue/prettier'],
	rules: {
		quotes: ['off', 'single', 'avoid-escape'],
		indent: ['off', 2],
		'array-element-newline': [
			'error',
			{
				multiline: true,
				minItems: 5
			}
		],
		'array-bracket-newline': [
			'error',
			{
				multiline: true,
				minItems: 5
			}
		],
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: { multiline: true, minProperties: 5 },
				ObjectPattern: { multiline: true, minProperties: 5 },
				ImportDeclaration: { multiline: true, minProperties: 5 },
				ExportDeclaration: { multiline: true, minProperties: 5 }
			}
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unused-vars': ['warn', { ignoreRestSiblings: true }]
	},
	parserOptions: { parser: 'babel-eslint' }
};
