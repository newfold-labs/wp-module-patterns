/**
 * Design Item component
 *
 * Orchestrates the various parts of a design item display
 */

/**
 * Internal dependencies
 */
import { useBlockProcessor } from "../../../../../hooks/useBlockProcessor";
import { useDesignInsertion } from "../../../../../hooks/useDesignInsertion";
import { useFavoritesManager } from "../../../../../hooks/useFavoritesManager";
import { usePluginRequirements } from "../../../../../hooks/usePluginRequirements";
import DesignItemView from "./DesignItemView";

const DesignItem = ({ item }) => {
	// Process blocks for preview
	const { previewBlocks, blocks } = useBlockProcessor(item);

	// Favorites functionality
	const { isFavorite, favoritesClickHandler, shouldShowTrash } = useFavoritesManager(item);

	// Design insertion logic
	const { insertDesignHandler, insertingDesign } = useDesignInsertion(blocks, item);

	// Check for premium plugin requirements
	const { hasInactivePlugins, hasPremiumPlugin } = usePluginRequirements(item);

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
			hasInactivePlugins={hasInactivePlugins}
		/>
	);
};

export default DesignItem;
