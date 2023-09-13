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
		'-nfd-bottom-1',
		'-nfd-top-1',
		'md:nfd-basis-full',
		'md:nfd-border-none',
		'md:nfd-flex-wrap',
		'md:nfd-flex',
		'md:nfd-gap-5',
		'md:nfd-gap-8',
		'md:nfd-grid-cols-1',
		'md:nfd-hidden',
		'md:nfd-items-start',
		'md:nfd-justify-center',
		'md:nfd-justify-end',
		'md:nfd-justify-start',
		'md:nfd-my-0',
		'md:nfd-order-2',
		'md:nfd-p-0',
		'md:nfd-px-0',
		'md:nfd-py-0',
		'md:nfd-rounded-lg',
		'md:nfd-self-start',
		'md:nfd-text-center',
		'md:nfd-text-left',
		'nfd-aspect-square',
		'nfd-col-end-10',
		'nfd-col-end-13',
		'nfd-col-end-7',
		'nfd-col-end-8',
		'nfd-col-end-9',
		'nfd-col-start-1',
		'nfd-col-start-4',
		'nfd-col-start-5',
		'nfd-col-start-6',
		'nfd-col-start-7',
		'nfd-grid-cols-12',
		'nfd-grid-cols-2',
		'nfd-grid-rows-1',
		'nfd-grid',
		'nfd-grow',
		'nfd-h-full',
		'nfd-items-center',
		'nfd-mb-8',
		'nfd-mt-[-100px]',
		'nfd-mt-8',
		'nfd-overflow-hidden',
		'nfd-p-0',
		'nfd-p-10',
		'nfd-p-2',
		'nfd-p-4',
		'nfd-p-8',
		'nfd-px-0',
		'nfd-px-4',
		'nfd-px-8',
		'nfd-py-0',
		'nfd-py-4',
		'nfd-py-5',
		'nfd-relative',
		'nfd-rounded',
		'nfd-row-start-1',
		'nfd-shrink-0',
		'nfd-top-10',
		'nfd-w-full',
	],
};
