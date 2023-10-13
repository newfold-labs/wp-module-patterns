/**
 * Class for observing elements entering the viewport and triggering animations.
 *
 */
export class ViewportAnimationObserver {
	constructor(options = {}) {
		this.options = {
			activeClass: 'nfd-wb-in-viewport',
			root: null,
			rootMargin: '0px',
			threshold: 0.5,
			...options,
		};
	}

	/**
	 * Observe elements to trigger animations.
	 *
	 * @param {NodeList} elements - Elements to observe.
	 */
	observeElements(elements) {
		if (!('IntersectionObserver' in window)) {
			return;
		}

		// eslint-disable-next-line no-undef
		const observer = new IntersectionObserver(
			this._handleIntersection.bind(this),
			this.options
		);

		elements.forEach((element) => observer.observe(element));
	}

	/**
	 * Handle intersection events to trigger animations.
	 *
	 * @param {Array<IntersectionObserverEntry>} entries  - Intersection entries.
	 * @param {IntersectionObserver}             observer - The observer instance.
	 * @private
	 */
	_handleIntersection(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(this.options.activeClass);
				observer.unobserve(entry.target);
			}
		});
	}
}
