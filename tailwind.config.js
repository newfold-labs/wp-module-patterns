module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				'wp-admin': 'var(--wp-admin-theme-color)',
				'grey-b': 'var(--nfd-wba-color-borders)',
				brand: {
					DEFAULT:
						'rgb(var(--nfd-wba-color-brand-rgb) / <alpha-value>)',
					darker: 'rgb(var(--nfd-wba-color-brand-darker-rgb) / <alpha-value>)',
				},
				grey: {
					DEFAULT:
						'rgb(var(--nfd-wba-color-grey-rgb) / <alpha-value>)',
					darker: 'rgb(var(--nfd-wba-color-grey-darker-rgb) / <alpha-value>)',
				},
				dark: {
					DEFAULT:
						'rgb(var(--nfd-wba-color-dark-rgb) / <alpha-value>)',
					lighter:
						'rgb(var(--nfd-wba-color-dark-lighter-rgb) / <alpha-value>)',
				},
			},
			transitionDuration: {
				DEFAULT: 'var(--nfd-wba-transition-duration)',
			},
			transitionTimingFunction: {
				DEFAULT: 'var(--nfd-wba-transition-timing)',
			},
			fontSize: {
				md: ['15px', '24px'],
				sm: ['12px', '19px'],
			},
			gridTemplateColumns: {
				'library-modal': 'var(--nfd-wba-sidebar-width) 1fr',
			},
		},
		screens: {
			sm: '600px',
			md: '782px',
			lg: '1080px',
			xl: '1440px',
		},
	},
	prefix: 'nfd-wba-',
	corePlugins: {
		preflight: false,
	},
};
