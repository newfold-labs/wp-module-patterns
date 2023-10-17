/**
 * Class for observing elements entering the viewport and triggering animations.
 *
 */
export class ViewportAnimationObserver {
	constructor(options = {}) {
		this.options = {
			activeClass: 'nfd-wb-animated-in',
			root: null,
			rootMargin: '0px',
			threshold: 0,
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

		elements.forEach((element) => {
			let elementToWatch = element;

			if (element.classList.contains('nfd-wb-reveal-right')) {
				elementToWatch = element.parentElement;
			}

			observer.observe(elementToWatch);
		});
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

				// Sync with parent element
				entry.target
					.querySelectorAll('.nfd-wb-animate')
					.forEach((element) => {
						element.classList.add(this.options.activeClass);
					});

				observer.unobserve(entry.target);
			}
		});
	}
}
