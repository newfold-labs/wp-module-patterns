/**
 * WordPress dependencies
 */
import { registerBlockCollection, setCategories } from "@wordpress/blocks";
import { select } from "@wordpress/data";
import { Icon, buttons } from "@wordpress/icons";

const currentCategories = select("core/blocks").getCategories();

/**
 * Register the 'WonderBlocks' block category.
 */
setCategories([
	{
		slug: "nfd-wonder-blocks",
		title: "WonderBlocks",
		icon: null,
	},
	...currentCategories,
]);

/**
 * Function to register a block collection for our blocks.
 */
registerBlockCollection("nfd-wonder-blocks", {
	title: "WonderBlocks",
	icon: <Icon icon={buttons} />,
});
