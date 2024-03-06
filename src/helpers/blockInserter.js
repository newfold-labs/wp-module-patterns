/**
 * WordPress dependencies
 */
import { dispatch, select } from "@wordpress/data";

/**
 * Insert blocks into the editor.
 *
 * @param {string} blocks Blocks to insert.
 * @return {Promise} Promise resolving the insertion.
 */
export const blockInserter = (blocks) => {
	const { insertBlocks, replaceBlock } = dispatch("core/block-editor");
	const { getSelectedBlock, getBlockHierarchyRootClientId, getBlockIndex, getGlobalBlockCount } =
		select("core/block-editor");

	const { clientId, name, attributes } = getSelectedBlock() || {};
	const rootClientId = clientId ? getBlockHierarchyRootClientId(clientId) : "";
	const insertionIndex = (rootClientId ? getBlockIndex(rootClientId) : getGlobalBlockCount()) + 1;

	// If currently selected block is an empty paragraph, replace it with the new blocks.
	if (name === "core/paragraph" && attributes?.content === "") {
		return replaceBlock(clientId, blocks);
	}

	// Insert blocks below currently selected block.
	return insertBlocks(blocks, insertionIndex);
};
