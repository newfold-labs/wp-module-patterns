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
	header,
	footer,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { heartSmall } from '../components/Icons';

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
		description: __('Add Gallery patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('images', 'nfd-wonder-blocks'),
			__('photos', 'nfd-wonder-blocks'),
			__('photography', 'nfd-wonder-blocks'),
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
		description: __('Add Blog patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('articles', 'nfd-wonder-blocks'),
			__('posts', 'nfd-wonder-blocks'),
			__('news', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'call-to-action',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: button,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'call-to-action' },
		title: __('Call to Action Patterns', 'nfd-wonder-blocks'),
		description: __('Add Call to Action patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('cta', 'nfd-wonder-blocks'),
			__('conversion', 'nfd-wonder-blocks'),
			__('button', 'nfd-wonder-blocks'),
		],
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
		keywords: [__('frequently asked questions', 'nfd-wonder-blocks')],
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
		keywords: [
			__('columns', 'nfd-wonder-blocks'),
			__('about', 'nfd-wonder-blocks'),
		],
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
		keywords: [
			__('title', 'nfd-wonder-blocks'),
			__('headline', 'nfd-wonder-blocks'),
			__('tagline', 'nfd-wonder-blocks'),
			__('text', 'nfd-wonder-blocks'),
		],
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
			__('banner', 'nfd-wonder-blocks'),
			__('image slider', 'nfd-wonder-blocks'),
			__('homepage', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'pricing',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: columns,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'pricing-table' },
		title: __('Pricing Table Patterns', 'nfd-wonder-blocks'),
		description: __('Add Pricing Table patterns.', 'nfd-wonder-blocks'),
		keywords: [
			__('plans', 'nfd-wonder-blocks'),
			__('comparison', 'nfd-wonder-blocks'),
			__('packages', 'nfd-wonder-blocks'),
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
			__('employees', 'nfd-wonder-blocks'),
			__('members', 'nfd-wonder-blocks'),
			__('profiles', 'nfd-wonder-blocks'),
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
			__('reviews', 'nfd-wonder-blocks'),
			__('feedback', 'nfd-wonder-blocks'),
			__('ratings', 'nfd-wonder-blocks'),
		],
	},
	{
		name: 'header',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: header,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'header' },
		title: __('Header Patterns', 'nfd-wonder-blocks'),
		description: __('Add Header patterns.', 'nfd-wonder-blocks'),
	},
	{
		name: 'footer',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: footer,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'footer' },
		title: __('Footer Patterns', 'nfd-wonder-blocks'),
		description: __('Add Footer patterns.', 'nfd-wonder-blocks'),
	},
	{
		name: 'favorites',
		icon: {
			foreground: 'var(--nfd-wba-color-brand)',
			src: heartSmall,
		},
		category: 'nfd-wonder-blocks',
		attributes: { category: 'favorites' },
		title: __('My Favorite Patterns', 'nfd-wonder-blocks'),
		description: __(
			"A collection of patterns you've selected.",
			'nfd-wonder-blocks'
		),
		keywords: [
			__('liked', 'nfd-wonder-blocks'),
			__('saved', 'nfd-wonder-blocks'),
			__('bookmarked', 'nfd-wonder-blocks'),
			__('starred', 'nfd-wonder-blocks'),
		],
	},
];
