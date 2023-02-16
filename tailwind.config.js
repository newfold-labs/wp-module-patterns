module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
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
