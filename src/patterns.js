/**
 * Internal dependencies
 */
import './styles/app.scss';
import './header-toolbar';
import './blocks/register-category';
import './blocks/block';
import LibraryModal from './components/library-modal';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';

window?.wp?.domReady(() => {
	// Create the library modal container.
	const libraryModalRoot = document.createElement('div');
	libraryModalRoot.id = 'nfd-cloud-patterns-library';

	// Append the modal container to the body if it hasn't been added already.
	if (!document.getElementById('nfd-cloud-patterns-library')) {
		document.body.append(libraryModalRoot);
	}

	render(<LibraryModal />, libraryModalRoot);
});
