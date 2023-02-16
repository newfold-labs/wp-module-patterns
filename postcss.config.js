const tailwind = require('./tailwind.config');
const { resolve } = require('path');

module.exports = () => ({
	ident: 'postcss',
	sourceMap: process.env.NODE_ENV !== 'production',
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
		process.env.NODE_ENV === 'production' &&
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
