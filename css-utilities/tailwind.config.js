module.exports = {
	content: ['./utilities.css'],
	prefix: 'nfd-',
	corePlugins: {
		preflight: false,
	},

	theme: {
		screens: {
			md: { max: '782px' },
			// => @media (max-width: 782px) { ... }
		},
	},

	// Include utility classes we need.
	safelist: [
		'nfd-p-0',
		'nfd-p-10',
		'nfd-py-0',
		'nfd-py-5',
		'nfd-my-0',
		'nfd-overflow-hidden',
		'nfd-relative',
		'nfd-z-10',
		'-nfd-top-1',
		'-nfd-bottom-1',
		'md:nfd-p-0',
		'md:nfd-py-0',
		'md:nfd-hidden',
		'md:nfd-order-2',
		'md:nfd-text-left',
	],
};
