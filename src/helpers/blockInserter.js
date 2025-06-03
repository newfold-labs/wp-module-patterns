/**
 * WordPress dependencies
 */
import { dispatch, select } from "@wordpress/data";

const findPostContentClientId = (blocks) => {
	for (const block of blocks) {
	  if (block.name === 'core/post-content') {
		return block.clientId;
	  }

	  if (block.innerBlocks && block.innerBlocks.length > 0) {
		const result = findPostContentClientId(block.innerBlocks);
		if (result) {
		  return result;
		}
	  }
	}
	return null; // Not found
}

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
	const blocksPresent = wp.data.select('core/block-editor').getBlocks();
	const hasTemplatePart = blocksPresent.some(block => block.name === 'core/template-part');

	const { clientId, name, attributes } = getSelectedBlock() || {};
	const rootClientId = clientId ? getBlockHierarchyRootClientId(clientId) : "";
	const insertionIndex = (rootClientId ? getBlockIndex(rootClientId) : getGlobalBlockCount()) + 1;

	// If currently selected block is an empty paragraph, replace it with the new blocks.
	if (name === "core/paragraph" && attributes?.content === "") {
		return replaceBlock(clientId, blocks);
	}

	if(hasTemplatePart){
		const postContentId = findPostContentClientId(blocksPresent);
		return insertBlocks(blocks, insertionIndex, postContentId);
	}
	// Insert blocks below currently selected block.
	return insertBlocks(blocks, insertionIndex);
};
