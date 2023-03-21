/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	button,
	category,
	columns,
	gallery,
	heading,
	help,
	people,
	postFeaturedImage,
	postList,
	quote,
} from '@wordpress/icons';

export const variations = [
	{
		name: 'gallery',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: gallery,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'gallersdsdy' },
		title: __('Gallery Patterns', 'nfd-wonder-blocks'),
		description: __('Add gallery patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('gallery', 'nfd-wonder-blocks'),
			__('images', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'blog',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: postList,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'blog' },
		title: __('Blog Patterns', 'nfd-wonder-blocks'),
		description: __('Add blog patterns.', 'nfd-wonder-blocks'),
		keywords: [__('blog', 'nfd-wonder-blocks')],
	},
	{
		name: 'call-to-action',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: button,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'cta' },
		title: __('Call to Action Patterns', 'nfd-wonder-blocks'),
		description: __('Add Call to Action patterns.', 'nfd-wonder-blocks'),
		keywords: [__('gallery', 'nfd-wonder-blocks')],
	},
	{
		name: 'faq',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: help,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'faq' },
		title: __('FAQ Patterns', 'nfd-wonder-blocks'),
		description: __('Add FAQ patterns.', 'nfd-wonder-blocks'),
		keywords: [__('gallery', 'nfd-wonder-blocks')],
	},
	{
		name: 'features',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: category,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'features' },
		title: __('Features Patterns', 'nfd-wonder-blocks'),
		description: __('Add Features patterns.', 'nfd-wonder-blocks'),
		keywords: [__('gallery', 'nfd-wonder-blocks')],
	},
	{
		name: 'headings',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: heading,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'headings' },
		title: __('Heading Patterns', 'nfd-wonder-blocks'),
		description: __('Add Heading patterns.', 'nfd-wonder-blocks'),
		keywords: [__('gallery', 'nfd-wonder-blocks')],
	},
	{
		name: 'hero',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: postFeaturedImage,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'hero' },
		title: __('Hero Patterns', 'nfd-wonder-blocks'),
		description: __('Add Hero patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('gallery', 'nfd-wonder-blocks'),
			__('images', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'pricing',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: columns,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'pricing' },
		title: __('Pricing Table Patterns', 'nfd-wonder-blocks'),
		description: __('Add Pricing Table patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('gallery', 'nfd-wonder-blocks'),
			__('images', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'team',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: people,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'team' },
		title: __('Team Patterns', 'nfd-wonder-blocks'),
		description: __('Add Team patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('gallery', 'nfd-wonder-blocks'),
			__('images', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'testimonials',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: quote,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'testimonials' },
		title: __('Testimonial Patterns', 'nfd-wonder-blocks'),
		description: __('Add Testimonial patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('gallery', 'nfd-wonder-blocks'),
			__('images', 'nfd-wonder-blocks'),
		],
	},
];
