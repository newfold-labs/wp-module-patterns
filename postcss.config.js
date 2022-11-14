const tailwind = require('./tailwind.config');
const { resolve } = require('path');

module.exports = (env) => ({
	ident: 'postcss',
	sourceMap: env !== 'production',
	plugins: [
		require('tailwindcss')({
			...tailwind,
			config: resolve(__dirname, 'tailwind.config.js'),
		}),
		(css) => {
			css.walkRules((rule) => {
				// Remove global rules like * and ::backdrop.
				if (
					rule.selector.startsWith('*') ||
					rule.selector.startsWith('::backdrop')
				) {
					rule.remove();
				}
			});
		},
		require('autoprefixer')({ grid: true }),
		env === 'production' &&
			require('cssnano')({
				preset: [
					'default',
					{
						discardComments: {
							removeAll: true,
						},
					},
				],
			}),
	],
});
