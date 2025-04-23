/**
 * Design Item View component
 *
 * Handles purely the visual representation without business logic
 */

/**
 * WordPress dependencies
 */
import { useState, useCallback } from "@wordpress/element";

/**
 * Internal dependencies
 */
import DesignItemControls from "./DesignItemControls";
import DesignItemFooter from "./DesignItemFooter";
import DesignItemPreview from "./DesignItemPreview";
import { usePluginRequirementsHandler } from "../../../../../hooks/usePluginRequirementsHandler";
import PluginProgressOverlay from "../../../../../components/PluginProgressBar";

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
	// Get plugin requirements from the item
	const pluginRequirements = item?.plugin_requirements || [];

	// Use a shared requirements handler for both buttons
	const {
		handlePluginRequirements,
		currentStep,
		operationDetails,
		isBusyState: requirementsBusyState,
		showProgressBar,
	} = usePluginRequirementsHandler({
		onRequirementsMet: insertDesignHandler,
		pluginRequirements,
	});

	// Combined busy state to pass to children
	const isBusyState = insertingDesign || requirementsBusyState;

	return (
		<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-border-grey-b nfd-wba-transition-all nfd-wba-duration-75 hover:nfd-wba-border-gray-300 nfd-wba-border nfd-wba-overflow-clip nfd-wba-rounded nfd-wba-border-solid">
			<div className="nfd-wba-relative">
				{/* Plugin installation overlay - visible when showProgressBar is true */}
				{showProgressBar && (
					<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-30 nfd-wba-bg-white/90 nfd-wba-flex nfd-wba-items-center nfd-wba-justify-center">
						<PluginProgressOverlay
							currentStep={currentStep}
							operationDetails={operationDetails}
							visible={showProgressBar}
						/>
					</div>
				)}

				{/* Overlay with controls */}
				<DesignItemControls
					item={item}
					isFavorite={isFavorite}
					insertingDesign={insertingDesign}
					hasPremiumPlugin={hasPremiumPlugin}
					insertDesignHandler={handlePluginRequirements}
					favoritesClickHandler={favoritesClickHandler}
					isBusyState={isBusyState}
				/>

				{/* Preview area */}
				<DesignItemPreview
					previewBlocks={previewBlocks}
					insertingDesign={insertingDesign}
					itemType={item?.type}
					insertDesignHandler={handlePluginRequirements}
				/>
			</div>

			{/* Footer area */}
			<DesignItemFooter
				item={item}
				isFavorite={isFavorite}
				insertingDesign={insertingDesign}
				shouldShowTrash={shouldShowTrash}
				insertDesignHandler={handlePluginRequirements}
				favoritesClickHandler={favoritesClickHandler}
				isBusyState={isBusyState}
			/>
		</div>
	);
};

export default DesignItemView;
