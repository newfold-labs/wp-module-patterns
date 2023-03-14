/**
 * Styles.
 */
import './styles/app.scss';

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
	NFD_WONDER_BLOCKS_MODAL_ID,
	NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID,
} from './constants';

import Modal from './components/Modal/Modal';
import ToolbarButton from './components/ToolbarButton';
import './blocks/register-category';
import './blocks/block';

domReady(() => {
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
 * Add the Wonder Blocks trigger button.
 * A hacky solution until proper FillSlot is implemented for adding header toolbar buttons in Gutenberg.
 */

const registerCallback = () => {
	window.requestAnimationFrame(() => {
		// Do not add the button again if it has been already added.
		if (document.getElementById(NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) {
			unsubscribe();
			return;
		}

		// Exit early if the toolbar doesn't exist.
		if (
			!document.querySelector('.edit-post-header-toolbar') &&
			!document.querySelector('.edit-site-header_start')
		) {
			return;
		}

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

		unsubscribe();
	});
};

const unsubscribe = subscribe(registerCallback);
