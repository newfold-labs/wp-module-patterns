/**
 * WordPress dependencies
 */
import { dispatch, select } from "@wordpress/data";

const findPostContentClientId = (blocks) => {
	if (!blocks || !Array.isArray(blocks)) {
		return null;
	}

	for (const block of blocks) {
		if (block?.name === "core/post-content") {
			return block.clientId;
		}

		if (block?.innerBlocks?.length > 0) {
			const result = findPostContentClientId(block.innerBlocks);
			if (result) {
				return result;
			}
		}
	}
	return null;
};

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
	const { getBlocks } = select("core/block-editor");
	const allBlocks = getBlocks();
	const hasTemplatePart = allBlocks.some((block) => block.name === "core/template-part");

	const { clientId, name, attributes } = getSelectedBlock() || {};
	const rootClientId = clientId ? getBlockHierarchyRootClientId(clientId) : "";
	const insertionIndex = (rootClientId ? getBlockIndex(rootClientId) : getGlobalBlockCount()) + 1;

	// If currently selected block is an empty paragraph, replace it with the new blocks.
	if (name === "core/paragraph" && attributes?.content === "") {
		return replaceBlock(clientId, blocks);
	}

	if (hasTemplatePart) {
		const postContentId = findPostContentClientId(allBlocks);
		if (postContentId) {
			return insertBlocks(blocks, insertionIndex, postContentId);
		}
	}
	// Insert blocks below currently selected block.
	return insertBlocks(blocks, insertionIndex);
};
