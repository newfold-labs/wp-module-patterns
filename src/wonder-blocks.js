/**
 * Styles.
 */
import './styles/app.scss';

/**
 * External dependencies
 */
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

import { subscribe } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	HIIVE_ANALYTICS_CATEGORY,
	NFD_REST_URL,
	NFD_WONDER_BLOCKS_MODAL_ID,
	NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID,
} from './constants';

import './blocks/inspector-control';
import './blocks/register-category';
import './blocks/block';
import Modal from './components/Modal/Modal';
import ToolbarButton from './components/ToolbarButton';

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
	const modalRoot = document.createElement('div');
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
 * Add the Wonder Blocks trigger button.
 * A hacky solution until proper FillSlot is implemented for adding header toolbar buttons in Gutenberg.
 */
const registerCallback = () => {
	const checkAndAppendButton = () => {
		window.requestAnimationFrame(() => {
			// Do not add the button again if it has been already added.
			if (document.getElementById(NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) {
				unsubscribe();
				console.log('rendered already added');
				return;
			}

			// Exit early if the toolbar doesn't exist.
			if (
				!document.querySelector('.edit-post-header-toolbar') &&
				!document.querySelector('.edit-site-header_start')
			) {
				return;
			}

			console.log('rendered');
			// Create the button container.
			const buttonContainer = document.createElement('div');
			buttonContainer.id = NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID;
			buttonContainer.classList.add('nfd-wba-shrink-0');

			// Append the button container to the block editor.
			document
				.querySelector('.edit-post-header-toolbar')
				?.append(buttonContainer);

			// Append the button container to the FSE.
			document
				.querySelector('.edit-site-header_start')
				?.append(buttonContainer);

			// Render the button.
			render(<ToolbarButton />, buttonContainer);

			// Dispatch 'wonder-blocks/toolbar-button-added' event.
			document.dispatchEvent(
				new Event('wonder-blocks/toolbar-button-added')
			);

			unsubscribe();
		});
	};

	// Start the initial check and append action
	checkAndAppendButton();

	// eslint-disable-next-line no-undef, no-unused-vars, no-shadow
	const observer = new MutationObserver((mutationsList, observer) => {
		// Call checkAndAppendButton on each DOM change observed to ensure button exists
		checkAndAppendButton();
	});

	const parentNode = document.querySelector('.edit-post-header-toolbar');

	// checking the gutenberg toolbar for changes
	if (parentNode) {
		observer.observe(parentNode, {
			childList: true,
			subtree: true,
		});
	}

	// clean up
	return () => {
		observer.disconnect();
	};
};

const unsubscribe = subscribe(registerCallback);
