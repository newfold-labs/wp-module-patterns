import { ViewportAnimationObserver } from "./viewportAnimationObserver";

document.addEventListener("DOMContentLoaded", () => {
	viewportAnimation();
});

// listen for wonder-blocks/toolbar-button-added event
document.addEventListener("wonder-blocks/toolbar-button-added", () => {
	viewportAnimation();
});

// listen for wonder-blocks/animation-changed event
document.addEventListener("wonder-blocks/animation-changed", (event) => {
	const clientId = event?.detail?.clientId;
	viewportAnimation(clientId);
});

// listen for wonder-blocks/block-order-changed event
document.addEventListener("wonder-blocks/block-order-changed", () => {
	viewportAnimation();
});

/**
 * Handles viewport animations (entrance/exit).
 * @param {string | null} clientId - The block's client ID.
 */
function viewportAnimation(clientId = null) {
	const isGutenberg =
		document.body.classList.contains("block-editor-page") ||
		Boolean(clientId) ||
		document.body.classList.contains("block-editor-iframe__body");

	const viewportAnimationObserver = new ViewportAnimationObserver({
		root: isGutenberg
			? document.querySelector(".interface-interface-skeleton__content") // Gutenberg scroll container
			: null,
		threshold: 0,
	});

	// Wait for React to add classes to the DOM
	// eslint-disable-next-line no-undef
	requestAnimationFrame(() => {
		const elementsToAnimate = Array.from(document.getElementsByClassName("nfd-wb-animate"));
		viewportAnimationObserver.observeElements(elementsToAnimate, clientId, isGutenberg);
	});
}
