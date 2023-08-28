// <reference types="Cypress" />

/**
 * @fileOverview
 * This test suite focuses on the "Patterns Tab" behavior within the WordPress admin page creation interface with the `wonder-blocks-library` query parameter.
 * The main objectives are to ensure that:
 * 1. When the modal is opened, the "Patterns" tab is active.
 * 2. Upon visiting the URL with the `wonder-blocks-library=templates` query parameter, the "Templates" tab is active.
 */

describe('Patterns Tab', () => {
	// This setup ensures a fresh starting state for each test.
	beforeEach(() => {
		// Visits the WordPress page editor with the 'wonder-blocks-library' query parameter
		// to establish a consistent initial test environment.
		cy.visit('/wp-admin/post-new.php?post_type=page&wonder-blocks-library');
	});

	it('Should be active on modal open', () => {
		// Asserts that the currently active tab has the 'Patterns' label when the modal is first opened.
		cy.get('.nfd-wba--is-active')
			.should('have.attr', 'aria-selected', 'true')
			.should('contain', 'Patterns');

		// Navigates to the WordPress page editor with the 'wonder-blocks-library=templates' query parameter.
		cy.visit(
			'/wp-admin/post-new.php?post_type=page&wonder-blocks-library=templates'
		);

		// Asserts that the currently active tab has the 'Templates' label after navigating to the updated URL.
		cy.get('.nfd-wba--is-active')
			.should('have.attr', 'aria-selected', 'true')
			.should('contain', 'Templates');
	});
});
