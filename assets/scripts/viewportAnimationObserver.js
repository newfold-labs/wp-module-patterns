/**
 * Class for observing elements entering the viewport and triggering animations.
 *
 */
export class ViewportAnimationObserver {
	constructor({ clientId, ...otherOptions } = {}) {
		this.options = {
			activeClass: 'nfd-wb-animated-in',
			root: null,
			rootMargin: '0px',
			threshold: 0,
			...otherOptions,
		};
	}

	/**
	 * Observe elements to trigger animations.
	 *
	 * @param {NodeList}      elements    - Elements to observe.
	 * @param {string | null} clientId    - The block's client ID.
	 * @param {boolean}       isGutenberg - Whether or not the page is in Gutenberg.
	 */
	observeElements(elements, clientId = null, isGutenberg = false) {
		if (!('IntersectionObserver' in window)) {
			return;
		}

		function wrappedMutationCallback(mutationsList, observer) {
			this._mutationCallback(mutationsList, observer, clientId);
		}

		// eslint-disable-next-line no-undef
		const intersectionObserver = new IntersectionObserver(
			this._handleIntersection.bind(this),
			this.options
		);

		// eslint-disable-next-line no-undef
		const mutationObserver = new MutationObserver(
			wrappedMutationCallback.bind(this)
		);

		// eslint-disable-next-line no-undef
		const classMutationObserver = new MutationObserver(
			this._handleClassMutation.bind(this)
		);

		elements.forEach((element) => {
			let elementToWatch = element;

			if (element.classList.contains('nfd-wb-reveal-right')) {
				elementToWatch = element.parentElement;
			}

			intersectionObserver.observe(elementToWatch);

			if (isGutenberg) {
				classMutationObserver.observe(elementToWatch, {
					attributes: true,
					attributeFilter: ['class'],
				});

				mutationObserver.observe(elementToWatch, {
					attributes: true,
					attributeFilter: ['class'],
				});
			}
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

	_handleClassMutation(entries) {
		entries.forEach((entry) => {
			if (entry?.type === 'attributes') {
				const target = entry.target;

				if (!target.classList.contains('nfd-wb-animated-in')) {
					target.classList.add('nfd-wb-animated-in');
				}
			}
		});
	}

	/**
	 * Callback function for the MutationObserver.
	 *
	 * @param {MutationRecord[]} entries  - List of mutations.
	 * @param {MutationObserver} observer - The observer instance.
	 * @param {string | null}    clientId - The block's client ID.
	 */
	_mutationCallback(entries, observer, clientId = null) {
		entries.forEach((entry) => {
			if (entry?.type === 'attributes') {
				const target = entry.target;

				// Try to add attribute to the element that is being changed (clientId)
				if (
					clientId &&
					clientId === target.getAttribute('data-block')
				) {
					if (target.getAttribute('data-replay-animation') === null) {
						target.setAttribute('data-replay-animation', true);

						// This actually resets the animation - CSS will take care of it.
						setTimeout(() => {
							target.removeAttribute('data-replay-animation');
						}, 50);
					}

					observer.disconnect();
				}
			}
		});
	}
}
