/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { buttons } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { store as nfdPatternsStore } from '../store';

registerBlockType(metadata, {
	icon: buttons,
	category: 'nfd-wonder-blocks',
	example: {
		attributes: {
			preview: window.nfdWonderBlocks?.assets + '/images/preview.png',
		},
	},

	edit: function Edit({ clientId, attributes }) {
		const { removeBlock } = useDispatch('core/block-editor');
		const { setIsModalOpen } = useDispatch(nfdPatternsStore);

		useEffect(() => {
			if (attributes.preview) {
				return;
			}

			if (attributes.search) {
				addTermToSearchParams(attributes.search);
			}

			// Open modal
			setIsModalOpen(true);

			// Remove empty block
			removeBlock(clientId);
		}, [clientId, attributes, removeBlock, setIsModalOpen]);

		return (
			<img
				style={{ display: 'block', maxWidth: '100%' }}
				src={attributes.preview}
				alt="Wonder Blocks"
			/>
		);
	},
});

const addTermToSearchParams = (term) => {
	const params = new URLSearchParams(window.location.search);
	params.append('nfd-patternType', term);
	window.history.replaceState(
		null,
		null,
		window.location.pathname + '?' + params.toString()
	);
};
