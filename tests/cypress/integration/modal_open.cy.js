// <reference types="Cypress" />

/**
 * @fileOverview
 * This test suite focuses on various methods of opening the "Wonder Blocks Library" modal within the WordPress admin page creation interface.
 *
 * Scenarios covered:
 * 1. Opening the modal by clicking the toolbar button.
 * 2. Opening the modal by adding the "Wonder Blocks" block through the WordPress block editor.
 * 3. Opening the modal directly via a URL parameter.
 * 4. Ensuring the modal opens with a predefined category when using specific WordPress block commands.
 *
 * Dependencies:
 * - Relies on the helper function `ModalOpen` for simulating and verifying the modal-opening process when the toolbar button is clicked.
 */

// Import necessary helper functions
import { ModalOpen } from './helpers/modal.cy';

describe('Open Modal', () => {
	// Setting up the test environment by visiting the WordPress page editor before each test.
	beforeEach(() => {
		cy.visit('/wp-admin/post-new.php?post_type=page');
	});

	// Test case to ensure the modal opens upon toolbar button click.
	it('Should open on Toolbar Button click', () => {
		ModalOpen();
	});

	// Test case to ensure the modal opens when adding the "Wonder Blocks" block.
	it('Should open on adding the Wonder Blocks block', () => {
		cy.get('.wp-block-post-content')
			.find('p')
			.first()
			.type('/Wonder Blocks{enter}');

		cy.get('.nfd-wba-library-modal-grid')
			.scrollIntoView()
			.should('be.visible');
	});

	// Test case to check if the modal opens when a specific URL parameter is provided.
	it('Should open with URL parameter', () => {
		cy.visit('/wp-admin/post-new.php?post_type=page&wonder-blocks-library');

		cy.get('.nfd-wba-library-modal-grid')
			.scrollIntoView()
			.should('be.visible');
	});

	// Test case to ensure the modal opens with a predefined category after using a specific WordPress block command.
	it('Should open with a predefined category', () => {
		cy.get('.wp-block-post-content')
			.find('p')
			.first()
			.type('/Heading Patterns{enter}');

		cy.get('.nfd-wba-library-modal-grid')
			.scrollIntoView()
			.should('be.visible');

		cy.get('ul.nfd-wba-list-elements')
			.find('.nfd-wba--is-active')
			.should('contain', 'Section Heading');
	});
});
