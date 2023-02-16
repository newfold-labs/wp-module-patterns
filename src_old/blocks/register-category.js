/**
 * WordPress dependencies
 */
import { registerBlockCollection, setCategories } from '@wordpress/blocks';
import { Icon, symbol } from '@wordpress/components';
import { select } from '@wordpress/data';

/**
 * Register the 'Cloud Patterns' block category.
 *
 * Note: The category label is overridden via registerBlockCollection() below.
 */
const currentCategories = select('core/blocks').getCategories();
setCategories([
	{
		slug: 'nfd-cloud-patterns',
		title: 'Cloud Patterns',
		icon: null,
	},
	...currentCategories,
]);

/**
 * Function to register a block collection for our block(s).
 */
registerBlockCollection('nfd-cloud-patterns', {
	title: 'Cloud Patterns',
	icon: <Icon icon={symbol} />,
});
