module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				libraryModal: '300px 1fr',
			},
			boxShadow: {
				sidebar:
					'0 0 0 1px rgb(0 0 0 / 1%), 0 0 32px 0px rgb(0 0 0 / 5%);',
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
