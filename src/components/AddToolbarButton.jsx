/**
 * WordPress dependencies
 */
import { debounce } from "@wordpress/compose";
import { createRoot } from "@wordpress/element";
import { useEffect, useRef } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID } from "../constants";
import ToolbarButton from "./ToolbarButton";

/**
 * Component that adds the WonderBlocks toolbar button to the editor.
 * Handles both iframe and non-iframe editor contexts.
 *
 * @return {null} This component doesn't render anything directly.
 */
const AddToolbarButton = () => {
	const observerRef = useRef(null);
	const rootRef = useRef(null);
	const debouncedAddToToolbarRef = useRef(null);

	useEffect(() => {
		// Get the correct document (check if we're in iframe, use parent if so)
		const getDocument = () => {
			// WordPress plugins run in parent window, but check both to be safe
			try {
				if (window.parent !== window && window.parent.document) {
					return window.parent.document;
				}
			} catch (e) {
				// Cross-origin or other error, use current document
			}
			return document;
		};

		const addButtonToToolbar = () => {
			const doc = getDocument();
			// If button already exists, don't create another one
			if (doc.getElementById(NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) return;

			// If a root already exists, unmount it first to prevent memory leak
			if (rootRef.current) {
				try {
					rootRef.current.unmount();
				} catch (e) {
					// Ignore errors if already unmounted
				}
				rootRef.current = null;
			}

			const toolbar =
				doc.querySelector(".edit-post-header-toolbar") ||
				doc.querySelector(".edit-site-header-edit-mode__start");

			if (!toolbar) {
				return;
			}

			const wonderBlocksButton = Object.assign(doc.createElement("div"), {
				id: NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID,
				className: "nfd-wba-shrink-0",
			});

			toolbar?.append(wonderBlocksButton);

			rootRef.current = createRoot(wonderBlocksButton);
			rootRef.current.render(<ToolbarButton />);
			doc.dispatchEvent(new Event("wonder-blocks/toolbar-button-added"));
		};

		debouncedAddToToolbarRef.current = debounce(addButtonToToolbar, 300);

		// Try multiple times with increasing delays
		const timeouts = [];
		[0, 100, 300, 500, 1000].forEach((delay) => {
			timeouts.push(
				setTimeout(() => {
					addButtonToToolbar();
				}, delay)
			);
		});

		// Set up observer to watch for toolbar creation
		const doc = getDocument();
		const siteEditor = doc.body;

		if (siteEditor) {
			observerRef.current = new window.MutationObserver((mutationsList) => {
				for (const mutation of mutationsList) {
					if (mutation.type === "childList") {
						debouncedAddToToolbarRef.current();
					}
				}
			});

			observerRef.current.observe(siteEditor, { childList: true, subtree: true });
		}

		// Cleanup function
		return () => {
			// Clear all timeouts
			timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
			if (debouncedAddToToolbarRef.current) {
				debouncedAddToToolbarRef.current.cancel();
			}
			// Defer unmounting to avoid race condition with React rendering
			if (rootRef.current) {
				const root = rootRef.current;
				rootRef.current = null;
				// Use setTimeout to defer unmount until after current render cycle
				setTimeout(() => {
					try {
						root.unmount();
					} catch (e) {
						// Ignore errors if already unmounted
					}
				}, 0);
			}
		};
	}, []);

	return null;
};

export default AddToolbarButton;
