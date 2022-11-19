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
		'nfd-my-0',
		'nfd-px-4',
		'nfd-p-5',
		'md:nfd-hidden',
		'md:nfd-order-2',
	],
};
