/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

// Helper function to recursively traverse blocks, including nested blocks
const traverseBlocks = (blocks, updateBlockAttributes) => {
	blocks.forEach((block) => {
		// If the block has attributes and a className attribute
		if (block?.attributes?.nfdGroupTheme) {
			// Remove all existing 'is-style-*' classes
			const classNameWithoutIsStyle = block.attributes.className
				.replace(/\bis-style-[^\s]+/g, "")
				.trim();

			// Add the new 'is-style-nfd-theme-*' class
			const updatedClassName = `${classNameWithoutIsStyle} is-style-nfd-theme-${block.attributes.nfdGroupTheme}`;

			// If className has changed, update the block
			if (updatedClassName !== block.attributes.className) {
				updateBlockAttributes(block.clientId, {
					className: updatedClassName,
					nfdGroupTheme: "", // Clear the theme attribute after applying it to className
				});
			}
		}

		// Recursively process inner blocks
		if (block.innerBlocks?.length) {
			traverseBlocks(block.innerBlocks, updateBlockAttributes);
		}
	});
};

// Custom Hook for updating theme classes in blocks, including nested blocks
const useUpdateThemeClasses = () => {
	const allBlocks = useSelect((select) => select("core/block-editor").getBlocks(), []);

	const { updateBlockAttributes } = useDispatch("core/block-editor");

	useEffect(() => {
		traverseBlocks(allBlocks, updateBlockAttributes);
	}, [allBlocks, updateBlockAttributes]);
};

export default useUpdateThemeClasses;
