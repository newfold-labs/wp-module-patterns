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
import { DEFAULT_PATTERNS_CATEGORY } from '../constants';
import { store as nfdPatternsStore } from '../store';
import metadata from './block.json';
import { variations } from './variations';

registerBlockType(metadata, {
	icon: {
		foreground: 'var(--nfd-wba-color-brand)',
		src: buttons,
	},
	category: 'nfd-wonder-blocks',
	example: {
		attributes: {
			preview: window.nfdWonderBlocks?.assets + '/images/preview.png',
		},
	},
	variations: [...variations],
	edit: function Edit({ clientId, attributes }) {
		const { removeBlock } = useDispatch('core/block-editor');
		const { setIsModalOpen, setActivePatternsCategory, setActiveTab } =
			useDispatch(nfdPatternsStore);

		useEffect(() => {
			if (attributes.preview) {
				return;
			}

			// Set active category and "patterns" tab.
			if (attributes.category) {
				setActiveTab('patterns');
				setActivePatternsCategory(attributes.category);
			} else {
				setActiveTab('patterns');
				setActivePatternsCategory(DEFAULT_PATTERNS_CATEGORY);
			}

			// Open modal
			setIsModalOpen(true);

			// Remove empty block
			removeBlock(clientId);
		}, [
			clientId,
			attributes,
			removeBlock,
			setIsModalOpen,
			setActivePatternsCategory,
			setActiveTab,
		]);

		return (
			<img
				style={{ display: 'block', maxWidth: '100%' }}
				src={attributes.preview}
				alt="Wonder Blocks"
			/>
		);
	},
});
