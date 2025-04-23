/**
 * External dependencies
 */
import { HeartIcon, PlusIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";

/**
 * Internal dependencies
 */
import PremiumBadge from "../../../../PremiumBadge";
import { usePluginRequirementsHandler } from "../../../../../hooks/usePluginRequirementsHandler";
import PluginProgressOverlay from "../../../../../components/PluginProgressBar";

/**
 * Design Controls Component
 *
 * Renders the overlay with control buttons for inserting design and
 * adding to favorites
 */
const DesignItemControls = ({
	item,
	isFavorite,
	insertingDesign,
	hasPremiumPlugin,
	insertDesignHandler,
	favoritesClickHandler,
}) => {
	// Get plugin requirements from the item
	const pluginRequirements = item?.plugin_requirements || [];

	// Setup plugin requirements handler
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

	// Determine if button should show busy state
	const isBusyState = insertingDesign || requirementsBusyState;

	return (
		<div className="nfd-wba-design-item--overlay">
			{hasPremiumPlugin && (
				<div className="nfd-wba-absolute nfd-wba-top-2 nfd-wba-right-2 nfd-wba-z-20">
					<PremiumBadge variant="logo" />
				</div>
			)}

			{showProgressBar ? (
				<PluginProgressOverlay
					currentStep={currentStep}
					operationDetails={operationDetails}
					visible={showProgressBar}
				/>
			) : (
				<div className="nfd-wba-design-item--overlay__buttons">
					<Button
						isBusy={isBusyState}
						isPressed={isBusyState}
						label={__("Add pattern to page", "nfd-wonder-blocks")}
						showTooltip={true}
						onClick={handlePluginRequirements}
						icon={<PlusIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-6" />}
					/>
					<Button
						className={classNames(
							isFavorite
								? "nfd-wba-cursor-default nfd-wba-bg-gray-100 !nfd-wba-text-red-600"
								: "nfd-wba-cursor-not-pointer hover:nfd-wba-text-red-600"
						)}
						showTooltip={true}
						label={
							isFavorite
								? __("Added to favorites", "nfd-wonder-blocks")
								: __("Add to favorites", "nfd-wonder-blocks")
						}
						onClick={() => favoritesClickHandler(false)}
						icon={
							<HeartIcon
								className={classNames(
									" nfd-wba-shrink-0 nfd-wba-size-6",
									!isFavorite && "!nfd-wba-fill-none"
								)}
							/>
						}
					/>
				</div>
			)}
		</div>
	);
};

export default DesignItemControls;
