/**
 * WordPress dependencies
 */
import { useState, useCallback } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { usePluginManager, PLUGIN_STEPS } from "./usePluginManager";

/**
 * Custom hook to handle plugin requirements before design insertion
 *
 * @param {Object} options Configuration options
 * @param {Function} options.onRequirementsMet Function to call when all plugin requirements are met
 * @param {Array} options.pluginRequirements Array of required plugins
 * @returns {Object} Plugin requirement utilities
 */
export const usePluginRequirementsHandler = ({
	onRequirementsMet,
	pluginRequirements = [],
	reloadAfterInstall = true,
	redirectParams = {},
}) => {
	const [isProcessingRequirements, setIsProcessingRequirements] = useState(false);

	// Setup plugin manager
	const { currentStep, operationDetails, processPlugins, isBusy, isIdle } = usePluginManager({
		reloadAfterInstall: reloadAfterInstall,
		redirectParams: redirectParams,
		showNotices: true,
		onSuccess: () => {
			setIsProcessingRequirements(false);
		},
		onError: () => {
			setIsProcessingRequirements(false);
		},
	});

	/**
	 * Handle checking and installing required plugins before insertion
	 */
	const handlePluginRequirements = useCallback(async () => {
		setIsProcessingRequirements(true);

		try {
			// No plugin requirements? Just proceed with insertion
			if (!pluginRequirements.length) {
				onRequirementsMet();
				return;
			}

			// Check if all plugins are already active
			let allActive = true;

			for (const plugin of pluginRequirements) {
				try {
					if (plugin?.status !== "active") {
						allActive = false;
						break; // No need to check further
					}
				} catch (error) {
					allActive = false;
					break;
				}
			}

			// If all plugins are already active, skip processPlugins
			if (allActive) {
				// All plugins are already active, directly proceed to insertion
				onRequirementsMet();
				setIsProcessingRequirements(false);
				return;
			}

			// Process all required plugins that need installation/activation
			const results = await processPlugins(pluginRequirements);

			// Check if all plugins were successfully processed
			const allSuccessful = Object.values(results).every((result) => result && result.success);

			if (!allSuccessful) {
				setIsProcessingRequirements(false);
			}
			// On success, onSuccess callback will handle insertion
		} catch (error) {
			setIsProcessingRequirements(false);
		}
	}, [pluginRequirements, processPlugins, onRequirementsMet]);

	// Derive UI states
	const isBusyState = isBusy || isProcessingRequirements;
	const showProgressBar =
		(isBusyState && !isIdle && currentStep !== PLUGIN_STEPS.IDLE) ||
		currentStep === PLUGIN_STEPS.ERROR;

	return {
		handlePluginRequirements,
		currentStep,
		operationDetails,
		isBusyState,
		showProgressBar,
		isProcessingRequirements,
	};
};
