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
		'nfd-p-2',
		'nfd-p-4',
		'nfd-p-8',
		'nfd-p-10',
		'nfd-py-0',
		'nfd-py-10',
		'nfd-py-5',
		'nfd-px-4',
		'nfd-px-8',
		'nfd-my-0',
		'nfd-overflow-hidden',
		'nfd-relative',
		'nfd-z-10',
		'-nfd-top-1',
		'-nfd-bottom-1',
		'md:nfd-gap-5',
		'md:nfd-p-0',
		'md:nfd-py-0',
		'md:nfd-hidden',
		'md:nfd-order-2',
		'md:nfd-text-left',
	],
};
