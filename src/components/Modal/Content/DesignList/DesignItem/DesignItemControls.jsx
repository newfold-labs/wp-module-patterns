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
import { PLUGIN_STEPS } from "../../../../../hooks/usePluginManager";
import { usePluginRequirementsHandler } from "../../../../../hooks/usePluginRequirementsHandler";

/**
 * Progress Bar Component
 */
const PluginProgressBar = ({ currentStep, progress = 0 }) => {
	// Convert progress to percentage
	const percentage = Math.min(Math.round(progress * 100), 100);

	// Get step label based on current step
	const getStepLabel = () => {
		switch (currentStep) {
			case PLUGIN_STEPS.CHECKING:
				return __("Checking plugin...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.INSTALLING:
				return __("Installing...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ACTIVATING:
				return __("Activating...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.SETTING_UP:
				return __("Setting up...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.COMPLETE:
				return __("Complete!", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return __("Error", "nfd-wonder-blocks");
			default:
				return __("Processing...", "nfd-wonder-blocks");
		}
	};

	return (
		<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-gap-2 nfd-wba-w-full">
			<div className="nfd-wba-flex nfd-wba-justify-between nfd-wba-items-center nfd-wba-text-sm nfd-wba-text-gray-600 nfd-wba-px-1">
				<span>{getStepLabel()}</span>
				<span>{percentage}%</span>
			</div>
			<div className="nfd-wba-bg-gray-200 nfd-wba-rounded-full nfd-wba-h-2 nfd-wba-w-full nfd-wba-overflow-hidden">
				<div
					className={classNames(
						"nfd-wba-h-full nfd-wba-rounded-full nfd-wba-transition-all nfd-wba-duration-300",
						currentStep === PLUGIN_STEPS.ERROR ? "nfd-wba-bg-red-500" : "nfd-wba-bg-blue-500"
					)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

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
				<div className="nfd-wba-p-4 nfd-wba-w-full nfd-wba-max-w-xs">
					<PluginProgressBar currentStep={currentStep} progress={operationDetails?.progress || 0} />
				</div>
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
