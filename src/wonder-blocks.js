/**
 * Styles.
 */
import "./styles/app.scss";

/**
 * External dependencies
 */
import { HiiveAnalytics } from "@newfold/js-utility-ui-analytics";

/**
 * WordPress dependencies
 */
import { default as wpApiFetch } from "@wordpress/api-fetch";
import { default as wpData } from "@wordpress/data";
import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";

/**
 * Internal dependencies
 */
import { HIIVE_ANALYTICS_CATEGORY, NFD_REST_URL, NFD_WONDER_BLOCKS_MODAL_ID } from "./constants";

import "./blocks/register-category";
import "./blocks/block";
import "./blocks/inspector-control";
import Modal from "./components/Modal/Modal";
import AddToolbarButton from "./components/AddToolbarButton";
import { setupCTBPostMessageListener } from "./helpers/ctbHandler";

domReady(() => {
	initializeHiiveAnalytics();
	renderModal();
	setupCTBPostMessageListener();
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
		dependencies: {
			wpData,
			wpApiFetch,
		},
	});
};

/**
 * Register the WonderBlocks plugin.
 */
registerPlugin("wonder-blocks", {
	render: AddToolbarButton,
});
