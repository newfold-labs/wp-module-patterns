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
	// Insert into the editor (note: Modal opens in a portal)
	const cloudPatterns = Object.assign(document.createElement('div'), {
		id: 'nfd-cloud-patterns-root',
	});
	document.body.append(cloudPatterns);
	render(<LibraryModal />, cloudPatterns);
});
