/**
 * Internal dependencies
 */
import metadata from './block.json';
import { dispatch } from '../helpers/events';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { Icon, symbol, table } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

registerBlockType(metadata, {
	icon: symbol,
	category: 'nfd-cloud-patterns',
	variations: [
		{
			name: 'table',
			icon: <Icon icon={table} />,
			category: 'nfd-cloud-patterns',
			attributes: { search: 'table' },
			title: __('Pricing Table Patterns', 'nfd-patterns'),
			description: __(
				'Add pricing patterns and layouts.',
				'nfd-patterns'
			),
			keywords: [
				__('slideshow', 'nfd-patterns'),
				__('images', 'nfd-patterns'),
			],
		},
	],
	edit: function Edit({ clientId, attributes }) {
		const { removeBlock } = useDispatch('core/block-editor');
		useEffect(() => {
			if (attributes.preview) {
				return;
			}
			if (attributes.search) {
				addTermToSearchParams(attributes.search);
			}
			// dispatch event to open modal
			dispatch('nfd/cloudPatterns/openLibrary');

			removeBlock(clientId);
		}, [clientId, attributes, removeBlock]);
		return (
			<img
				style={{ display: 'block', maxWidth: '100%' }}
				src={attributes.preview}
				alt={''}
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
