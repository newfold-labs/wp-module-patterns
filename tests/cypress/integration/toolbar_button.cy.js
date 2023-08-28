// <reference types="Cypress" />

/**
 * @fileOverview
 * This test suite focuses on the Toolbar Button's behavior within the WordPress admin page creation interface.
 * It ensures that:
 * 1. The toolbar button is visible.
 * 2. Clicking on the toolbar button triggers the modal to open.
 */

// Import necessary helper functions
import { ModalOpen } from './helpers/modal.cy'; // Imports the ModalOpen function to emulate and verify the modal-opening process.

describe('Toolbar Button', function () {
	// Test case to validate the visibility of the toolbar button.
	it('shows toolbar button that opens the modal', () => {
		// Visits the WordPress page editor for creating a new page.
		cy.visit('/wp-admin/post-new.php?post_type=page');
		// Asserts that the toolbar button, identified by its specific ID, is visible on the page.
		cy.get('#nfd-wba-toolbar-button').should('be.visible');
	});

	// Test case to verify the behavior of the modal when the toolbar button is clicked.
	it('should open the modal when the button is clicked', () => {
		// Visits the WordPress page editor for creating a new page.
		cy.visit('/wp-admin/post-new.php?post_type=page');
		// Uses the helper function to initiate the modal-opening process and verify its behavior.
		ModalOpen();
	});
});
