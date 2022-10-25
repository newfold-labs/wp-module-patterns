const tailwind = require('./tailwind.config');

module.exports = {
	plugins: {
		tailwindcss: {
			...tailwind,
			// important: '.nfd-cloud-patterns',
		},
		autoprefixer: {
			grid: true,
		},
	},
};
