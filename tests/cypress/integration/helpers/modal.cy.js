/**
 * @fileOverview
 * This helper module provides utility functions for simulating modal interactions in the WordPress admin interface.
 * Specifically, these functions can open and close the "Wonder Blocks Library" modal.
 *
 * Functions included:
 * 1. ModalOpen: Opens the "Wonder Blocks Library" modal by simulating a button click, then verifies its visibility.
 */

/**
 * Simulates the opening of the "Wonder Blocks Library" modal.
 *
 * How it works:
 * 1. Targets the toolbar button identified by the ID `#nfd-wba-toolbar-button`.
 * 2. Finds the nested button component with the class `components-toolbar__control`.
 * 3. Simulates a click event on the button.
 * 4. Validates that the clicked button receives the class `is-pressed`.
 * 5. Verifies the visibility of the `.nfd-wba-library-modal-grid` which indicates the modal has opened.
 */
export const ModalOpen = () => {
	cy.get('#nfd-wba-toolbar-button')
		.find('button.components-toolbar__control')
		.click()
		.should('have.class', 'is-pressed');

	cy.get('.nfd-wba-library-modal-grid').scrollIntoView().should('be.visible');
};
