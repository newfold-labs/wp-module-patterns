(() => {
  // assets/scripts/viewportAnimationObserver.js
  var ViewportAnimationObserver = class {
    constructor(options = {}) {
      this.options = {
        activeClass: "nfd-wb-animated-in",
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
        ...options
      };
    }
    /**
     * Observe elements to trigger animations.
     *
     * @param {NodeList} elements - Elements to observe.
     */
    observeElements(elements) {
      if (!("IntersectionObserver" in window)) {
        return;
      }
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
  };

  // assets/scripts/utilities.js
  document.addEventListener("DOMContentLoaded", () => {
    viewportAnimation();
  });
  function viewportAnimation() {
    const viewportAnimationObserver = new ViewportAnimationObserver({
      // activeClass: 'nfd-wb-in-viewport'
      threshold: 0.2
      // at least 20% of the element is in the viewport
    });
    const elementsToAnimate = document.querySelectorAll(".nfd-wb-animate");
    viewportAnimationObserver.observeElements(elementsToAnimate);
  }
})();
//# sourceMappingURL=utilities.js.map
