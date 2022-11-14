module.exports = {
	content: ['./utilities.css'],
	prefix: 'nfd-',
	corePlugins: {
		preflight: false,
	},

	// Include utility classes we need.
	safelist: ['nfd-bg-red-500', 'nfd-text-3xl', 'lg:nfd-text-2xl'],
};
