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

	// Include Talwind utility classes we need.
	safelist: [
		'nfd-grid',
		'nfd-grid-cols-12',
		'nfd-grid-cols-2',
		'nfd-col-start-1',
		'nfd-col-start-4',
		'nfd-col-start-5',
		'nfd-col-start-6',
		'nfd-col-start-7',
		'nfd-col-end-7',
		'nfd-col-end-8',
		'nfd-col-end-9',
		'nfd-col-end-10',
		'nfd-col-end-13',
		'nfd-grid-rows-1',
		'nfd-row-start-1',
		'nfd-p-0',
		'nfd-p-2',
		'nfd-p-4',
		'nfd-p-8',
		'nfd-p-10',
		'nfd-py-0',
		'nfd-py-5',
		'nfd-px-0',
		'nfd-px-4',
		'nfd-px-8',
		'nfd-my-0',
		'nfd-mt-8',
		'nfd-mb-8',
		'nfd-overflow-hidden',
		'nfd-relative',
		'nfd-h-full',
		'nfd-w-full',
		'nfd-items-center',
		'-nfd-top-1',
		'-nfd-bottom-1',
		'md:nfd-rounded-lg',
		'md:nfd-gap-5',
		'md:nfd-gap-8',
		'md:nfd-p-0',
		'md:nfd-px-0',
		'md:nfd-py-0',
		'md:nfd-my-0',
		'md:nfd-hidden',
		'md:nfd-order-2',
		'md:nfd-text-left',
		'md:nfd-text-center',
		'md:nfd-justify-center',
		'md:nfd-items-start',
		'md:nfd-self-start',
		'md:nfd-grid-cols-1',
	],
};
