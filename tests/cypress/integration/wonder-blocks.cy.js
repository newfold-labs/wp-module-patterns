// <reference types="Cypress" />

describe("WonderBlocks", function () {
	before(() => {
		cy.visit("/wp-admin/post-new.php");
	});

	it("WonderBlocks button exists", () => {
		cy.get("#nfd-wba-toolbar-button").should("exist");
	});

	it("WonderBlocks button opens modal", () => {
		cy.wait(1000);

		cy.window().then((win) => {
			win.wp.data.select("core/edit-post").isFeatureActive("welcomeGuide") &&
				win.wp.data.dispatch("core/edit-post").toggleFeature("welcomeGuide");
		});

		cy.wait(100);
		cy.get("#nfd-wba-toolbar-button button").click();
		cy.wait(100);
		// body has class modal-open
		cy.get("body").should("have.class", "modal-open");
		// modal window exists
		cy.get('.nfd-wba-modal[role="dialog"]').should("be.visible");
	});

	it("Close buttons closes modal", () => {
		cy.get('.nfd-wba-modal__header button[aria-label="Close dialog"]').should("exist");
		cy.get('.nfd-wba-modal__header button[aria-label="Close dialog"]').click();
		cy.wait(100);
		cy.get("body").should("not.have.class", "modal-open");
		cy.get('.nfd-wba-modal[role="dialog"]').should("not.exist");
	});

	it("ESC button closes modal too", () => {
		cy.get("#nfd-wba-toolbar-button button").click();
		cy.wait(100);
		cy.get('.nfd-wba-modal[role="dialog"]').should("be.visible");
		cy.get("body").type("{esc}");
		cy.wait(100);
		cy.get('.nfd-wba-modal[role="dialog"]').should("not.exist");
	});
});
