/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { gallery } from '@wordpress/icons';

export const variations = [
	{
		name: 'gallery',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: gallery,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'gallery' },
		title: __('Gallery Patterns', 'nfd-wonder-blocks'),
		description: __(
			'Add gallery patterns and templates.',
			'nfd-wonder-blocks'
		),
		keywords: [
			__('gallery', 'nfd-wonder-blocks'),
			__('images', 'nfd-wonder-blocks'),
		],
	},
];
