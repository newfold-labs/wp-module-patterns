/**
 * Design Item component
 *
 * Orchestrates the various parts of a design item display
 */

/**
 * WordPress dependencies
 */
import { memo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import DesignItemView from "./DesignItemView";
import { useBlockProcessor } from "../../../../../hooks/useBlockProcessor";
import { useFavoritesManager } from "../../../../../hooks/useFavoritesManager";
import { useDesignInsertion } from "../../../../../hooks/useDesignInsertion";

const DesignItem = ({ item }) => {
	// Process blocks for preview
	const { previewBlocks, blocks } = useBlockProcessor(item);

	// Favorites functionality
	const { isFavorite, favoritesClickHandler, shouldShowTrash } = useFavoritesManager(item);

	// Design insertion logic
	const { insertDesignHandler, insertingDesign } = useDesignInsertion(blocks, item);

	// Check for premium plugin requirements
	const hasPremiumPlugin = item?.plugin_requirements?.some((plugin) => plugin.isPremium);

	return (
		<DesignItemView
			item={item}
			previewBlocks={previewBlocks}
			isFavorite={isFavorite}
			insertingDesign={insertingDesign}
			hasPremiumPlugin={hasPremiumPlugin}
			shouldShowTrash={shouldShowTrash}
			insertDesignHandler={insertDesignHandler}
			favoritesClickHandler={favoritesClickHandler}
		/>
	);
};

export default DesignItem;
