module.exports = {
	content: ['./utilities.css'],
	prefix: 'nfd-',
	corePlugins: {
		preflight: false,
	},

	// Include utility classes we need.
	safelist: ['nfd-m-0', 'nfd-px-4'],
};
