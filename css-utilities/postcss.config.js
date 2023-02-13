const tailwind = require('./tailwind.config');
const { resolve } = require('path');

module.exports = () => {
	return {
		ident: 'postcss',
		sourceMap: process.env.NODE_ENV !== 'production',
		plugins: [
			require('postcss-import'),
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
			(css) => {
				css.walkRules((rule) => {
					// Add the :not() exception to paddings
					if (
						new RegExp('[:]?[^a-z]-?p[a-z]?-.+').test(rule.selector)
					) {
						rule.selector += ':not([style*="padding"])';
					}

					// Add the :not() exception to margins
					if (
						new RegExp('[:]?[^a-z]-?m[a-z]?-.+').test(rule.selector)
					) {
						rule.selector += ':not([style*="margin"])';
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
			require('postcss-safe-important'),
		],
	};
};
