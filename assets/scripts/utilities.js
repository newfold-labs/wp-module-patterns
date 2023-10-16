import { ViewportAnimationObserver } from './viewportAnimationObserver';

document.addEventListener('DOMContentLoaded', () => {
	viewportAnimation();
});

// listen for wonder-blocks/toolbar-button-added event
document.addEventListener('wonder-blocks/toolbar-button-added', () => {
	viewportAnimation();
});

/**
 * Handles viewport animations (entrance/exit).
 */
function viewportAnimation() {
	const isGutenberg = document.body.classList.contains('block-editor-page');

	const viewportAnimationObserver = new ViewportAnimationObserver({
		root: isGutenberg
			? document.querySelector('.interface-interface-skeleton__content') // Gutenberg scroll container
			: null,
		threshold: 0.2, // at least 20% of the element is in the viewport
	});

	const elementsToAnimate = document.querySelectorAll('.nfd-wb-animate');

	if (!isGutenberg) {
		viewportAnimationObserver.observeElements(elementsToAnimate);
	}
}
