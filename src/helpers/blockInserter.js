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
 * Whether the block lives inside the post-content block (including post-content itself).
 *
 * @param {string|null} blockClientId Block client ID.
 * @param {string}      postContentId Post content block client ID.
 * @return {boolean}
 */
const isInsidePostContent = (blockClientId, postContentId) => {
	if (!blockClientId || !postContentId) {
		return false;
	}

	if (blockClientId === postContentId) {
		return true;
	}

	const { getBlockParents } = select("core/block-editor");
	const parents = getBlockParents(blockClientId, true);
	return parents.includes(postContentId);
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
	const postContentId = findPostContentClientId(allBlocks);

	const { clientId, name, attributes } = getSelectedBlock() || {};
	const rootClientId = clientId ? getBlockHierarchyRootClientId(clientId) : "";
	const insertionIndex = (rootClientId ? getBlockIndex(rootClientId) : getGlobalBlockCount()) + 1;

	// If currently selected block is an empty paragraph, replace it with the new blocks.
	if (name === "core/paragraph" && attributes?.content === "") {
		return replaceBlock(clientId, blocks);
	}

	// Page templates may inline the header (no core/template-part) but still use post-content.
	if (postContentId) {
		const postContentBlocks = getBlocks(postContentId);
		let index = postContentBlocks.length;

		if (clientId && isInsidePostContent(clientId, postContentId)) {
			index = getBlockIndex(clientId) + 1;
		}

		return insertBlocks(blocks, index, postContentId);
	}
	// Insert blocks below currently selected block.
	return insertBlocks(blocks, insertionIndex);
};
