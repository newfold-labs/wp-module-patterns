/**
 * WordPress dependencies
 */
import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

// Custom Hook for monitoring block order in a WordPress Gutenberg block editor.
const useMonitorBlockOrder = () => {
	// Fetch all blocks from Gutenberg's block editor.
	const allBlocks = useSelect((select) => select("core/block-editor").getBlocks(), []);

	// Use an effect to monitor changes to the block order.
	useEffect(() => {
		document.dispatchEvent(new CustomEvent("wonder-blocks/block-order-changed"));
	}, [allBlocks]); // Re-run if `allBlocks` changes.
};

export default useMonitorBlockOrder;
