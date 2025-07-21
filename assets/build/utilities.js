(() => {
  // source/scripts/viewportAnimationObserver.js
  var ViewportAnimationObserver = class {
    constructor({ clientId, ...otherOptions } = {}) {
      this.options = {
        activeClass: "nfd-wb-animated-in",
        root: null,
        rootMargin: "0px",
        threshold: 0,
        ...otherOptions
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
      if (!("IntersectionObserver" in window)) {
        return;
      }
      if (!elements?.length) {
        return;
      }
      if (document.documentElement.classList.contains("block-editor-block-preview__content-iframe")) {
        return;
      }
      function wrappedMutationCallback(mutationsList, observer) {
        this._mutationCallback(mutationsList, observer, clientId);
      }
      const intersectionObserver = new IntersectionObserver(
        this._handleIntersection.bind(this),
        this.options
      );
      const mutationObserver = new MutationObserver(wrappedMutationCallback.bind(this));
      const classMutationObserver = new MutationObserver(this._handleClassMutation.bind(this));
      elements.forEach((element) => {
        let elementToWatch = element;
        if (element.classList.contains("nfd-wb-reveal-right")) {
          elementToWatch = element.parentElement;
        }
        intersectionObserver.observe(elementToWatch);
        if (isGutenberg) {
          classMutationObserver.observe(elementToWatch, {
            attributes: true,
            attributeFilter: ["class"]
          });
          mutationObserver.observe(elementToWatch, {
            attributes: true,
            attributeFilter: ["class"]
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
          entry.target.querySelectorAll(".nfd-wb-animate").forEach((element) => {
            element.classList.add(this.options.activeClass);
          });
          observer.unobserve(entry.target);
        }
      });
    }
    _handleClassMutation(entries) {
      entries.forEach((entry) => {
        if (entry?.type === "attributes") {
          const target = entry.target;
          if (!target.classList.contains("nfd-wb-animated-in")) {
            target.classList.add("nfd-wb-animated-in");
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
        if (entry?.type === "attributes") {
          const target = entry.target;
          if (clientId && clientId === target.getAttribute("data-block")) {
            if (target.getAttribute("data-replay-animation") === null) {
              target.setAttribute("data-replay-animation", true);
              requestAnimationFrame(() => {
                target.removeAttribute("data-replay-animation");
              });
            }
            observer.disconnect();
          }
        }
      });
    }
  };

  // source/scripts/utilities.js
  document.addEventListener("DOMContentLoaded", () => {
    viewportAnimation();
  });
  document.addEventListener("wonder-blocks/toolbar-button-added", () => {
    viewportAnimation();
  });
  document.addEventListener("wonder-blocks/animation-changed", (event) => {
    const clientId = event?.detail?.clientId;
    viewportAnimation(clientId);
  });
  document.addEventListener("wonder-blocks/block-order-changed", () => {
    viewportAnimation();
  });
  window.onload = function() {
    viewportAnimation();
  };
  function viewportAnimation(clientId = null) {
    const isGutenberg = document.body.classList.contains("block-editor-page") || Boolean(clientId) || document.body.classList.contains("block-editor-iframe__body");
    const rootElement = isGutenberg ? document.querySelector(".interface-interface-skeleton__content") : null;
    const viewportAnimationObserver = new ViewportAnimationObserver({
      root: rootElement,
      threshold: 0
    });
    requestAnimationFrame(() => {
      const elementsToAnimate = Array.from(document.getElementsByClassName("nfd-wb-animate"));
      viewportAnimationObserver.observeElements(elementsToAnimate, clientId, isGutenberg);
    });
  }
})();
//# sourceMappingURL=utilities.js.map
