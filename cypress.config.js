const { defineConfig } = require('cypress');

module.exports = defineConfig({
	env: {
		wpUsername: 'admin',
		wpPassword: 'password',
		wpVersion: '6.3',
		phpVersion: '8.1',
	},
	e2e: {
		baseUrl: 'http://localhost:8882',
		specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'tests/cypress/support/index.js',
		setupNodeEvents(on, config) {
			return config;
		},
	},
});
