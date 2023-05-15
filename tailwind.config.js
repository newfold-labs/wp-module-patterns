module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				'wp-admin': 'var(--wp-admin-theme-color)',
				'grey-b': 'var(--nfd-wba-color-borders)',
				'primary-blue': 'var(--nfd-wba-color-primary-blue)',
				brand: {
					DEFAULT:
						'rgb(var(--nfd-wba-color-brand-rgb) / <alpha-value>)',
					darker: 'rgb(var(--nfd-wba-color-brand-darker-rgb) / <alpha-value>)',
					'darker-10':
						'rgb(var(--nfd-wba-color-brand-darker-10-rgb) / <alpha-value>)',
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
				md: ['14px', '22px'],
				sm: ['12px', '19px'],
			},
			boxShadow: {
				'design-item': '0px 0px 14px rgba(143, 142, 131, 0.25)',
			},
		},
		screens: {
			sm: '782px',
			md: '782px',
			lg: '1024px',
			xl: '1440px',
		},
	},
	prefix: 'nfd-wba-',
	corePlugins: {
		preflight: false,
	},
};
