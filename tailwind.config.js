module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				libraryModal: '300px 1fr',
			},
			boxShadow: {
				content:
					'0 0 0 1px rgb(0 0 0 / 1%), 0 4px 32px 2px rgb(0 0 0 / 8%)',
			},
		},
		screens: {
			sm: '600px',
			md: '782px',
		},
	},
	prefix: 'nfd-',
	corePlugins: {
		preflight: false,
	},
};
