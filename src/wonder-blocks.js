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
import { createRoot } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";
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

import "./blocks/block";
import "./blocks/inspector-control";
import "./blocks/register-category";
import Modal from "./components/Modal/Modal";
import ToolbarButton from "./components/ToolbarButton";

domReady(() => {
	initializeHiiveAnalytics();
	renderModal();
});

/**
 * Renders a modal element with the given element ID.
 *
 * @param {string} [elementId] - The ID of the modal element.
 * @return {void}
 */
const renderModal = (elementId = NFD_WONDER_BLOCKS_MODAL_ID) => {
	if (document.getElementById(elementId)) return;

	const wonderBlocksModal = Object.assign(document.createElement("div"), {
		id: elementId,
		className: "nfd-wba-modal",
	});

	document.body.append(wonderBlocksModal);
	createRoot(wonderBlocksModal).render(<Modal />);
};

const addWonderBlocksButton = () => {
	const observer = new window.MutationObserver((mutationsList) => {
		for (const mutation of mutationsList) {
			if (mutation.type === "childList") {
				debouncedAddToToolbar();
			}
		}
	});

	const addButtonToToolbar = () => {
		if (document.getElementById(NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) return;

		const toolbar =
			document.querySelector(".edit-post-header-toolbar") ||
			document.querySelector(".edit-site-header-edit-mode__start");

		if (!toolbar) {
			return;
		}

		const wonderBlocksButton = Object.assign(document.createElement("div"), {
			id: NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID,
			className: "nfd-wba-shrink-0",
		});

		toolbar?.append(wonderBlocksButton);
		createRoot(wonderBlocksButton).render(<ToolbarButton />);
		document.dispatchEvent(new Event("wonder-blocks/toolbar-button-added"));
	};

	const debouncedAddToToolbar = debounce(addButtonToToolbar, 300);

	if (
		!document.querySelector(".edit-post-header-toolbar") &&
		!document.querySelector(".edit-site-header-edit-mode__start")
	) {
		const siteEditor = document.body;

		if (siteEditor) {
			observer.observe(siteEditor, { childList: true, subtree: true });
		}
	} else {
		addButtonToToolbar();
	}
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
 * Register the WonderBlocks plugin.
 */
registerPlugin("wonder-blocks", {
	render: addWonderBlocksButton,
});
