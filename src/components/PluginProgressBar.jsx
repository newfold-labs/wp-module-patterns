/**
 * WordPress dependencies
 */
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { XIcon, RefreshCcwIcon } from "lucide-react";

/**
 * Internal dependencies
 */
import { PLUGIN_STEPS } from "../hooks/usePluginManager";
import PluginLogo from "./PluginLogo";

/**
 * Circular progress indicator component with animation
 */
const CircularProgress = ({ percentage = 0, size = 112, strokeWidth = 6, isError = false }) => {
	// Track the displayed percentage for animation
	const [displayedPercentage, setDisplayedPercentage] = useState(0);

	// Calculate circle properties
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const dash = (displayedPercentage * circumference) / 100;
	const strokeDashoffset = circumference - dash;

	// Animate the percentage change
	useEffect(() => {
		// Skip animation on first render or for error state
		if (isError) {
			setDisplayedPercentage(percentage);
			return;
		}

		// Animate to target percentage
		let start = displayedPercentage;
		const end = percentage;
		const duration = 800; // Animation duration in ms
		const startTime = performance.now();

		// Don't animate if it's a decrease (typically on retry)
		if (start > end) {
			setDisplayedPercentage(end);
			return;
		}

		// Animation frame function
		const animateProgress = (timestamp) => {
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Easing function for smoother animation
			const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
			const currentValue = start + (end - start) * easedProgress;

			setDisplayedPercentage(Math.round(currentValue));

			if (progress < 1) {
				requestAnimationFrame(animateProgress);
			}
		};

		requestAnimationFrame(animateProgress);
	}, [percentage, isError]);

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
					stroke={isError ? "#DC2626" : "#178113"}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					transform={`rotate(90, ${size / 2}, ${size / 2})`}
				/>
			</svg>

			{/* Percentage display */}
			<div
				className={`nfd-wba-text-3xl nfd-wba-font-medium ${isError ? "nfd-wba-text-red-600" : "nfd-wba-text-brand"}`}
			>
				{isError ? (
					<XIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-6" />
				) : (
					<>
						{displayedPercentage}
						<span className="nfd-wba-text-xl">%</span>
					</>
				)}
			</div>
		</div>
	);
};

/**
 * Enhanced Plugin Progress Bar Component
 */
export const PluginProgressBar = ({
	currentStep,
	progress = 0,
	plugin,
	errorMessage,
	onRetry,
	message,
}) => {
	// Convert progress to percentage
	const percentage = Math.min(Math.round(progress * 100), 100);
	const isError = currentStep === PLUGIN_STEPS.ERROR;

	// Estimated time remaining
	const [timeRemaining, setTimeRemaining] = useState(30);

	// Update time remaining based on progress
	useEffect(() => {
		if (percentage > 0 && percentage < 100 && !isError) {
			const remaining = Math.round((30 * (100 - percentage)) / 100);
			setTimeRemaining(remaining < 1 ? 1 : remaining);
		}
	}, [percentage, isError]);

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
			case PLUGIN_STEPS.RELOADING:
				return __("Reloading Page", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return __("Error Installing", "nfd-wonder-blocks");
			default:
				return __("Processing", "nfd-wonder-blocks");
		}
	};

	return (
		<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-6 nfd-wba-text-center nfd-wba-max-w-md nfd-wba-mx-auto nfd-wba-p-6">
			{!isError && <CircularProgress percentage={percentage} isError={isError} />}

			<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-4 nfd-wba-text-center">
				<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-center">
					<h2
						className={`nfd-wba-text-[14px] nfd-wba-font-medium nfd-wba-m-0 ${isError ? "nfd-wba-text-red-600" : "nfd-wba-text-gray-900"}`}
					>
						{currentStep === PLUGIN_STEPS.RELOADING ? (
							<>{__("Reloading Page", "nfd-wonder-blocks")}</>
						) : (
							<>
								{getStepAction()} {__("Dependent Feature:", "nfd-wonder-blocks")} {plugin?.name}
							</>
						)}
					</h2>

					{isError ? (
						<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-2">
							<button
								className="nfd-wba-bg-red-50 nfd-wba-text-red-600 nfd-wba-border nfd-wba-border-red-300 nfd-wba-px-3 nfd-wba-py-1 nfd-wba-rounded-md nfd-wba-text-xs nfd-wba-font-medium nfd-wba-flex nfd-wba-items-center nfd-wba-gap-1 nfd-wba-hover:bg-red-100 nfd-wba-transition-colors"
								onClick={onRetry}
							>
								<RefreshCcwIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-4" />
								{__("Retry", "nfd-wonder-blocks")}
							</button>
						</div>
					) : currentStep === PLUGIN_STEPS.RELOADING ? (
						<p className="nfd-wba-text-xs nfd-wba-m-0 nfd-wba-text-gray-500">
							{message || __("Page is reloading to apply changes...", "nfd-wonder-blocks")}
						</p>
					) : (
						percentage < 100 && (
							<p className="nfd-wba-text-xs nfd-wba-m-0 nfd-wba-text-gray-500">
								{__("About", "nfd-wonder-blocks")} {timeRemaining}{" "}
								{__("seconds remaining", "nfd-wonder-blocks")}
							</p>
						)
					)}
				</div>

				{/* Plugin description */}
				{!isError && (
					<p className="nfd-wba-text-[14px] nfd-wba-m-0 nfd-wba-text-gray-600 nfd-wba-mt-2">
						{plugin?.description}
					</p>
				)}
			</div>

			{!isError && <PluginLogo plugin={plugin?.plsProviderName || plugin?.slug} height="20" />}
		</div>
	);
};

/**
 * Plugin Progress Overlay
 */
const PluginProgressOverlay = ({
	currentStep,
	operationDetails,
	visible,
	pluginInfo = {},
	onRetry,
}) => {
	if (!visible) {
		return null;
	}

	return (
		<div className="nfd-wba-p-4 nfd-wba-w-full nfd-wba-max-w-lg nfd-wba-mx-auto">
			<PluginProgressBar
				currentStep={currentStep}
				progress={operationDetails?.progress || 0}
				errorMessage={operationDetails?.error?.message}
				message={operationDetails?.message}
				onRetry={onRetry}
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
