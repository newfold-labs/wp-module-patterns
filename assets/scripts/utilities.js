import { ViewportAnimationObserver } from './viewportAnimationObserver';

document.addEventListener('DOMContentLoaded', () => {
	viewportAnimation();
});

// listen for wonder-blocks/toolbar-button-added event
document.addEventListener('wonder-blocks/toolbar-button-added', () => {
	viewportAnimation();
});

// listen for wonder-blocks/animation-changed event
document.addEventListener('wonder-blocks/animation-changed', (event) => {
	const clientId = event?.detail?.clientId;
	viewportAnimation(clientId);
});

/**
 * Handles viewport animations (entrance/exit).
 * @param {string | null} clientId - The block's client ID.
 */
function viewportAnimation(clientId = null) {
	const isGutenberg = document.body.classList.contains('block-editor-page');

	const viewportAnimationObserver = new ViewportAnimationObserver({
		root: isGutenberg
			? document.querySelector('.interface-interface-skeleton__content') // Gutenberg scroll container
			: null,
		threshold: 0.2, // at least 20% of the element is in the viewport
	});

	// Wait for React to add classes to the DOM
	setTimeout(() => {
		const elementsToAnimate = Array.from(
			document.getElementsByClassName('nfd-wb-animate')
		);

		viewportAnimationObserver.observeElements(
			elementsToAnimate,
			clientId,
			isGutenberg
		);
	}, 10);
}
