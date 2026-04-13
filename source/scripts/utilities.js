import { ViewportAnimationObserver } from "./viewportAnimationObserver";

/* eslint-disable no-undef */

// Animation configs for the Web Animations API (editor only).
// CSS transitions don't work reliably in the editor because other
// stylesheets override opacity/transform with !important.
// Keep in sync with source/css-utilities/parts/animations/animations.css
const ANIM_CONFIGS = {
	"nfd-wb-fade-in-bottom": {
		from: { opacity: 0, transform: "translate3d(0, 90px, 0)" },
		duration: 1200,
	},
	"nfd-wb-fade-in-bottom-short": {
		from: { opacity: 0, transform: "translate3d(0, 32px, 0)" },
		duration: 600,
	},
	"nfd-wb-fade-in-top-short": {
		from: { opacity: 0, transform: "translate3d(0, -32px, 0)" },
		duration: 600,
	},
	"nfd-wb-fade-in-left-short": {
		from: { opacity: 0, transform: "translate3d(-32px, 0, 0)" },
		duration: 600,
	},
	"nfd-wb-fade-in-right-short": {
		from: { opacity: 0, transform: "translate3d(32px, 0, 0)" },
		duration: 600,
	},
	"nfd-wb-zoom-in": { from: { opacity: 0, transform: "scale3d(0.4, 0.4, 0.4)" }, duration: 1200 },
	"nfd-wb-zoom-in-short": {
		from: { opacity: 0, transform: "scale3d(0.92, 0.92, 0.92)" },
		duration: 600,
	},
	"nfd-wb-twist-in": {
		from: { opacity: 0, transform: "translateY(40px) scale(0.8) rotateY(30deg) rotateZ(-12deg)" },
		duration: 1000,
	},
	"nfd-wb-reveal-right": {
		from: { clipPath: "inset(0 100% 0 0)" },
		to: { clipPath: "inset(0 0 0 0)" },
		duration: 1500,
		easing: "cubic-bezier(0.4, 0, 0, 1)",
	},
};

// --- Bootstrap ---

[
	"DOMContentLoaded",
	"wonder-blocks/toolbar-button-added",
	"wonder-blocks/block-order-changed",
].forEach((evt) => document.addEventListener(evt, () => init()));
document.addEventListener("wonder-blocks/animation-changed", (e) => init(e?.detail?.clientId));
window.onload = () => init();
if (document.readyState !== "loading") init();

// --- Init ---

let editorWatcherSetup = false;

function init(clientId = null) {
	if (document.documentElement.classList.contains("block-editor-block-preview__content-iframe"))
		return;

	if (window.parent !== window) {
		editorAnimation();
	} else {
		viewportAnimation(clientId);
	}
}

// --- Helpers ---

/** Extract the animation class name from a class string (only known animation types). */
const getAnimClass = (str) => str.split(/\s+/).find((c) => c in ANIM_CONFIGS) || "";

/** Add nfd-wb-animated-in instantly (no CSS transition). */
function restoreInstantly(el) {
	el.style.transition = "none";
	el.classList.add("nfd-wb-animated-in");
	requestAnimationFrame(() => {
		el.style.transition = "";
	});
}

/** Play an animation preview via the Web Animations API. */
function playPreview(el, animClass) {
	const cfg = ANIM_CONFIGS[animClass];
	if (!cfg) return;
	el.animate([cfg.from, cfg.to || { opacity: 1, transform: "none" }], {
		duration: cfg.duration,
		easing: cfg.easing || "cubic-bezier(0.4, 1, 0.65, 1)",
	});
}

// --- Editor (iframe) ---

function editorAnimation() {
	if (document.body) document.body.classList.add("nfd-wb-editor-animations");

	// Mark existing animated elements so they don't start invisible
	requestAnimationFrame(() => {
		document
			.querySelectorAll(".nfd-wb-animate:not(.nfd-wb-animated-in)")
			.forEach((el) => el.classList.add("nfd-wb-animated-in"));
	});

	if (editorWatcherSetup) return;
	editorWatcherSetup = true;

	/** Scan a newly-added DOM node (and descendants) for animation elements and restore them instantly. */
	const ensureVisible = (root) => {
		if (root.querySelectorAll) {
			root.querySelectorAll(".nfd-wb-animate:not(.nfd-wb-animated-in)").forEach(restoreInstantly);
		}
		if (
			root.classList?.contains("nfd-wb-animate") &&
			!root.classList.contains("nfd-wb-animated-in")
		) {
			restoreInstantly(root);
		}
	};

	const observer = new MutationObserver((mutations) => {
		for (const m of mutations) {
			// New DOM nodes (e.g. editor chat replacing block content)
			if (m.type === "childList") {
				for (const node of m.addedNodes) {
					if (node.nodeType === 1) ensureVisible(node);
				}
				continue;
			}

			// Class attribute changed
			if (m.type !== "attributes" || m.attributeName !== "class") continue;
			const t = m.target;
			if (
				!t.classList.contains("nfd-wb-animate") ||
				t.classList.contains("nfd-wb-animated-in") ||
				t.hasAttribute("data-replay-animation")
			)
				continue;

			const oldAnim = getAnimClass(m.oldValue || "");
			const newAnim = getAnimClass([...t.classList].join(" "));

			if (oldAnim !== newAnim && newAnim) {
				t.classList.add("nfd-wb-animated-in");
				playPreview(t, newAnim);
			} else {
				restoreInstantly(t);
			}
		}
	});

	const startObserving = () => {
		if (!document.body) {
			requestAnimationFrame(startObserving);
			return;
		}
		document.body.classList.add("nfd-wb-editor-animations");
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
			attributeOldValue: true,
			childList: true,
			subtree: true,
		});
	};
	startObserving();
}

// --- Frontend ---

function viewportAnimation(clientId = null) {
	const isGutenberg = document.body?.classList.contains("block-editor-page") || Boolean(clientId);
	const root = isGutenberg
		? document.querySelector(".interface-interface-skeleton__content")
		: null;

	const observer = new ViewportAnimationObserver({ root, threshold: 0 });
	requestAnimationFrame(() => {
		observer.observeElements(
			Array.from(document.getElementsByClassName("nfd-wb-animate")),
			clientId,
			isGutenberg
		);
	});
}
