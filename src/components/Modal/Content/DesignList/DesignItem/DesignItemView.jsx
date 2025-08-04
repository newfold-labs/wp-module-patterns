/**
 * Design Item View component
 *
 * Handles purely the visual representation without business logic
 */

/**
 * Internal dependencies
 */
import PluginProgressOverlay from "../../../../../components/PluginProgressBar";
import { usePluginRequirementsHandler } from "../../../../../hooks/usePluginRequirementsHandler";
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
	hasPremiumPlugins,
	hasInactivePlugins,
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
		reloadAfterInstall: true,
	});

	// Combined busy state to pass to children
	const isBusyState = insertingDesign || requirementsBusyState;

	return (
		<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-border-grey-b nfd-wba-transition-all nfd-wba-duration-75 hover:nfd-wba-border-gray-300 nfd-wba-border nfd-wba-overflow-clip nfd-wba-rounded nfd-wba-border-solid">
			{showProgressBar && (
				<div className="nfd-wba-min-h-[370px] nfd-wba-z-30 nfd-wba-bg-white/95 nfd-wba-flex nfd-wba-items-center nfd-wba-justify-center">
					<PluginProgressOverlay
						currentStep={currentStep}
						operationDetails={operationDetails}
						visible={showProgressBar}
						onRetry={handlePluginRequirements}
					/>
				</div>
			)}

			{!showProgressBar && (
				<>
					<div className="nfd-wba-relative">
						<DesignItemControls
							item={item}
							isFavorite={isFavorite}
							insertingDesign={insertingDesign}
							hasPremiumPlugins={hasPremiumPlugins}
							insertDesignHandler={handlePluginRequirements}
							favoritesClickHandler={favoritesClickHandler}
							isBusyState={isBusyState}
							hasInactivePlugins={hasInactivePlugins}
						/>

						<DesignItemPreview
							previewBlocks={previewBlocks}
							insertingDesign={insertingDesign}
							itemType={item?.type}
							insertDesignHandler={handlePluginRequirements}
						/>
					</div>

					<DesignItemFooter
						item={item}
						isFavorite={isFavorite}
						insertingDesign={insertingDesign}
						shouldShowTrash={shouldShowTrash}
						insertDesignHandler={handlePluginRequirements}
						favoritesClickHandler={favoritesClickHandler}
						isBusyState={isBusyState}
						hasInactivePlugins={hasInactivePlugins}
					/>
				</>
			)}
		</div>
	);
};

export default DesignItemView;
