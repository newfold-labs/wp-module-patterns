/**
 * WordPress dependencies
 */
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { PLUGIN_STEPS } from "../hooks/usePluginManager";
import PluginLogo from "./PluginLogo";

/**
 * Circular progress indicator component
 */
const CircularProgress = ({ percentage = 0, size = 112, strokeWidth = 6 }) => {
	// Calculate circle properties
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const dash = (percentage * circumference) / 100;
	const strokeDashoffset = circumference - dash;

	return (
		<div
			className="nfd-wba-flex nfd-wba-justify-center nfd-wba-items-center nfd-wba-relative"
			style={{ width: size, height: size }}
		>
			<svg
				className="nfd-wba-absolute nfd-wba-inset-0"
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
			>
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="#D9D9D9"
					strokeWidth={strokeWidth}
				/>

				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="#178113"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					transform={`rotate(90, ${size / 2}, ${size / 2})`}
				/>
			</svg>

			{/* Percentage display */}
			<div className="nfd-wba-text-3xl nfd-wba-font-medium nfd-wba-text-brand">
				{percentage}
				<span className="nfd-wba-text-xl">%</span>
			</div>
		</div>
	);
};

/**
 * Enhanced Plugin Progress Bar Component
 */
export const PluginProgressBar = ({ currentStep, progress = 0, plugin }) => {
	// Convert progress to percentage
	const percentage = Math.min(Math.round(progress * 100), 100);

	// Estimated time remaining
	const [timeRemaining, setTimeRemaining] = useState(30);

	// Update time remaining based on progress
	useEffect(() => {
		if (percentage > 0 && percentage < 100) {
			const remaining = Math.round((30 * (100 - percentage)) / 100);
			setTimeRemaining(remaining < 1 ? 1 : remaining);
		}
	}, [percentage]);

	// Get step action verb
	const getStepAction = () => {
		switch (currentStep) {
			case PLUGIN_STEPS.CHECKING:
				return __("Checking", "nfd-wonder-blocks");
			case PLUGIN_STEPS.INSTALLING:
				return __("Installing", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ACTIVATING:
				return __("Activating", "nfd-wonder-blocks");
			case PLUGIN_STEPS.SETTING_UP:
				return __("Setting up", "nfd-wonder-blocks");
			case PLUGIN_STEPS.COMPLETE:
				return __("Installed", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return __("Error installing", "nfd-wonder-blocks");
			default:
				return __("Processing", "nfd-wonder-blocks");
		}
	};

	return (
		<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-6 nfd-wba-text-center nfd-wba-max-w-md nfd-wba-mx-auto nfd-wba-p-6">
			<CircularProgress percentage={percentage} />

			<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-4 nfd-wba-text-center">
				<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-center">
					<h2 className="nfd-wba-text-[14px] nfd-wba-font-medium nfd-wba-m-0 nfd-wba-text-gray-900">
						{getStepAction()} {__("Dependent Feature:", "nfd-wonder-blocks")} {plugin?.name}
					</h2>

					{/* Time remaining */}
					{percentage < 100 && (
						<p className="nfd-wba-text-xs nfd-wba-m-0 nfd-wba-text-gray-500">
							{__("About", "nfd-wonder-blocks")} {timeRemaining}{" "}
							{__("seconds remaining", "nfd-wonder-blocks")}
						</p>
					)}
				</div>

				{/* Plugin description */}
				<p className="nfd-wba-text-[14px]nfd-wba-m-0 nfd-wba-text-gray-600 nfd-wba-mt-2">
					{plugin?.description}
				</p>
			</div>

			<PluginLogo plugin={plugin?.slug} height="20" />
		</div>
	);
};

/**
 * Plugin Progress Overlay
 */
const PluginProgressOverlay = ({ currentStep, operationDetails, visible, pluginInfo = {} }) => {
	if (!visible) {
		return null;
	}

	return (
		<div className="nfd-wba-p-4 nfd-wba-w-full nfd-wba-max-w-lg nfd-wba-mx-auto">
			<PluginProgressBar
				currentStep={currentStep}
				progress={operationDetails?.progress || 0}
				plugin={{
					name: operationDetails?.plugin?.name || pluginInfo?.name,
					description: operationDetails?.plugin?.description || pluginInfo?.description,
					slug: operationDetails?.plugin?.slug || pluginInfo?.slug,
				}}
			/>
		</div>
	);
};

export default PluginProgressOverlay;
