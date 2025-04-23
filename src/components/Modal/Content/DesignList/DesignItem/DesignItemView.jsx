/**
 * Design Item View component
 *
 * Handles purely the visual representation without business logic
 */

/**
 * Internal dependencies
 */
import DesignItemControls from "./DesignItemControls";
import DesignItemFooter from "./DesignItemFooter";
import DesignItemPreview from "./DesignItemPreview";

const DesignItemView = ({
	item,
	isFavorite,
	insertingDesign,
	shouldShowTrash,
	insertDesignHandler,
	favoritesClickHandler,
	previewBlocks,
	hasPremiumPlugin,
}) => {
	return (
		<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-border-grey-b nfd-wba-transition-all nfd-wba-duration-75 hover:nfd-wba-border-gray-300 nfd-wba-border nfd-wba-overflow-clip nfd-wba-rounded nfd-wba-border-solid">
			<div className="nfd-wba-relative">
				{/* Overlay with controls */}
				<DesignItemControls
					item={item}
					isFavorite={isFavorite}
					insertingDesign={insertingDesign}
					hasPremiumPlugin={hasPremiumPlugin}
					insertDesignHandler={insertDesignHandler}
					favoritesClickHandler={favoritesClickHandler}
				/>

				{/* Preview area */}
				<DesignItemPreview
					previewBlocks={previewBlocks}
					insertingDesign={insertingDesign}
					itemType={item?.type}
					insertDesignHandler={insertDesignHandler}
				/>
			</div>

			{/* Footer area */}
			<DesignItemFooter
				item={item}
				isFavorite={isFavorite}
				insertingDesign={insertingDesign}
				shouldShowTrash={shouldShowTrash}
				insertDesignHandler={insertDesignHandler}
				favoritesClickHandler={favoritesClickHandler}
			/>
		</div>
	);
};

export default DesignItemView;
