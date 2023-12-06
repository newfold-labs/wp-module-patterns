const wpPrettierConfig = require('@wordpress/prettier-config');

module.exports = {
	...wpPrettierConfig,
	overrides: [
		{
			files: 'css-utilities/parts/**/*.{css,sass,scss}',
			options: {
				printWidth: 160,
			},
		},
	],
};
