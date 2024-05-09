/**
 * Styles.
 */
import "./styles/app.scss";

/**
 * External dependencies
 */
import { HiiveAnalytics } from "@newfold-labs/js-utility-ui-analytics";

/**
 * WordPress dependencies
 */
import domReady from "@wordpress/dom-ready";
import { render } from "@wordpress/element";

import { subscribe } from "@wordpress/data";
import { debounce } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import {
	HIIVE_ANALYTICS_CATEGORY,
	NFD_REST_URL,
	NFD_WONDER_BLOCKS_MODAL_ID,
	NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID,
} from "./constants";

import "./blocks/inspector-control";
import "./blocks/register-category";
import "./blocks/block";
import Modal from "./components/Modal/Modal";
import ToolbarButton from "./components/ToolbarButton";

domReady(() => {
	initializeHiiveAnalytics();
	renderModal(NFD_WONDER_BLOCKS_MODAL_ID);
});

/**
 * This function creates a modal that is rendered on the page.
 *
 * @param {string} elementId It takes an elementId as an argument and creates a div with the given elementId.
 */
const renderModal = (elementId) => {
	const modalRoot = document.createElement("div");
	modalRoot.id = elementId;

	// Append the modal container to the body if it hasn't been added already.
	if (!document.getElementById(elementId)) {
		document.body.append(modalRoot);
	}

	render(<Modal />, modalRoot);
};

/**
 * Initialize Hiive Analytics.
 */
const initializeHiiveAnalytics = () => {
	HiiveAnalytics.initialize({
		namespace: HIIVE_ANALYTICS_CATEGORY,
		urls: {
			single: `${NFD_REST_URL}/events`,
			batch: `${NFD_REST_URL}/events/batch`,
		},
		settings: {
			debounce: {
				time: 3000,
			},
		},
	});
};

/**
 * Add the WonderBlocks trigger button.
 * A hacky solution until proper FillSlot is implemented for adding header toolbar buttons in Gutenberg.
 */
const registerCallback = () => {
	const appendWonderBlockButton = () => {
		window.requestAnimationFrame(() => {
			// Do not add the button again if it has been already added.
			if (document.getElementById(NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) {
				// Re-rendering when button was already appended
				unsubscribe();
				return;
			}

			// Exit early if the toolbar doesn't exist.
			if (
				!document.querySelector(".edit-post-header-toolbar") &&
				!document.querySelector(".edit-site-header_start")
			) {
				return;
			}

			// Create the button container.
			const buttonContainer = document.createElement("div");
			buttonContainer.id = NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID;
			buttonContainer.classList.add("nfd-wba-shrink-0");

			// Append the button container to the block editor.
			document.querySelector(".edit-post-header-toolbar")?.append(buttonContainer);

			// Append the button container to the FSE.
			document.querySelector(".edit-site-header_start")?.append(buttonContainer);

			// Render the button.
			render(<ToolbarButton />, buttonContainer);

			// Dispatch 'wonder-blocks/toolbar-button-added' event.
			document.dispatchEvent(new Event("wonder-blocks/toolbar-button-added"));

			unsubscribe();
		});
	};

	appendWonderBlockButton();

	const debouncedAppendWonderBlockButton = debounce(appendWonderBlockButton, 400);

	// eslint-disable-next-line no-undef
	const observer = new MutationObserver(() => {
		debouncedAppendWonderBlockButton();
	});

	const parentNode = document.querySelector(".edit-post-header-toolbar");

	// checking the gutenberg toolbar for changes
	if (parentNode) {
		observer.observe(parentNode, {
			childList: true,
			subtree: true,
		});
	}

	// clean up or stopping the mutationObserver to watch the changes
	return () => {
		observer.disconnect();
	};
};

const unsubscribe = subscribe(registerCallback);
