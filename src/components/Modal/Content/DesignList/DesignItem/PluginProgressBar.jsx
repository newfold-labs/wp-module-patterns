/**
 * Plugin Installation Overlay Component
 *
 * Shows a progress bar overlay during plugin installation processes
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import classNames from "classnames";

/**
 * Internal dependencies
 */
import { PLUGIN_STEPS } from "../../../../../hooks/usePluginManager";

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
 * Plugin Installation Overlay
 */
const PluginInstallationOverlay = ({ currentStep, operationDetails, showOverlay }) => {
	if (!showOverlay) {
		return null;
	}

	return (
		<div className="nfd-wba-design-item--plugin-overlay nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-30 nfd-wba-bg-white/90 nfd-wba-flex nfd-wba-items-center nfd-wba-justify-center">
			<div className="nfd-wba-p-4 nfd-wba-w-full nfd-wba-max-w-xs">
				<PluginProgressBar currentStep={currentStep} progress={operationDetails?.progress || 0} />
			</div>
		</div>
	);
};

export default PluginInstallationOverlay;
