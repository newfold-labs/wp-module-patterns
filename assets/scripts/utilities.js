import { ViewportAnimationObserver } from './viewportAnimationObserver';

document.addEventListener('DOMContentLoaded', () => {
	viewportAnimation();
});

/**
 * Handles viewport animations (entrance/exit).
 */
function viewportAnimation() {
	const viewportAnimationObserver = new ViewportAnimationObserver({
		// activeClass: 'nfd-wb-in-viewport'
		threshold: 0.2, // at least 20% of the element is in the viewport
	});

	const elementsToAnimate = document.querySelectorAll('.nfd-wb-animate');

	viewportAnimationObserver.observeElements(elementsToAnimate);
}
