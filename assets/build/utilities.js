(() => {
  // assets/scripts/viewportAnimationObserver.js
  var ViewportAnimationObserver = class {
    constructor(options = {}) {
      this.options = {
        activeClass: "nfd-wb-animated-in",
        root: null,
        rootMargin: "0px",
        threshold: 0,
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
      elements.forEach((element) => {
        let elementToWatch = element;
        if (element.classList.contains("nfd-wb-mask-reveal-right")) {
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
          observer.unobserve(entry.target);
        }
      });
    }
  };

  // assets/scripts/utilities.js
  document.addEventListener("DOMContentLoaded", () => {
    viewportAnimation();
  });
  document.addEventListener("wonder-blocks/toolbar-button-added", () => {
    viewportAnimation();
  });
  function viewportAnimation() {
    const isGutenberg = document.body.classList.contains("block-editor-page");
    const viewportAnimationObserver = new ViewportAnimationObserver({
      root: isGutenberg ? document.querySelector(".interface-interface-skeleton__content") : null,
      threshold: 0.4
      // at least 0% of the element is in the viewport
    });
    const elementsToAnimate = document.querySelectorAll(".nfd-wb-animate");
    if (!isGutenberg) {
      viewportAnimationObserver.observeElements(elementsToAnimate);
    }
  }
})();
//# sourceMappingURL=utilities.js.map
