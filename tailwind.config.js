module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				libraryModal: '300px 1fr',
				designs: 'repeat(auto-fit, minmax(400px, 1fr))',
			},
			boxShadow: {
				sidebar:
					'0 0 0 1px rgb(0 0 0 / 1%), 0 0 32px 0px rgb(0 0 0 / 5%);',
			},
			colors: {
				'wp-admin': 'var(--wp-admin-theme-color)',
			},
		},
		screens: {
			sm: '600px',
			md: '782px',
			lg: '1080px',
			xl: '1440px',
		},
	},
	prefix: 'nfd-',
	corePlugins: {
		preflight: false,
	},
};
