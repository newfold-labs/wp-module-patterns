/**
 * Internal dependencies
 */
import ToolbarButton from '../components/ToolbarButton';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

const shouldRegister = () => {
	// Do not add the button again if it has been already added.
	if (document.getElementById('nfd-patterns-library-button')) {
		return false;
	}

	// Exit early if the toolbar doesn't exist.
	if (
		!document.querySelector('.edit-post-header-toolbar') &&
		!document.querySelector('.edit-site-header_start')
	) {
		return false;
	}

	return true;
};

/**
 * Add the patterns selector button.
 * A hacky solution until proper FillSlot is implemented for adding header toolbar buttons in Gutenberg.
 */
const unsubscribe = window?.wp?.data?.subscribe(() => {
	window.requestAnimationFrame(() => {
		if (!shouldRegister()) {
			return;
		}

		// Create the button container.
		const buttonContainer = document.createElement('div');
		buttonContainer.id = 'nfd-patterns-library-button';
		buttonContainer.classList.add('nfd-cloud-patterns');

		// Append the button container to the block editor.
		document
			.querySelector('.edit-post-header-toolbar')
			?.append(buttonContainer);

		// Append the button container to the FSE.
		document
			.querySelector('.edit-site-header_start')
			?.append(buttonContainer);

		render(<ToolbarButton />, buttonContainer);
		unsubscribe();
	});
});
