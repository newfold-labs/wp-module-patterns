/**
 * WordPress dependencies
 */
import { useState, useCallback, useEffect } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { store as noticesStore } from "@wordpress/notices";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { fetcher } from "../helpers/fetcher";
import { store as nfdPatternsStore } from "../store";

/**
 * The possible steps in plugin processing
 */
export const PLUGIN_STEPS = {
	IDLE: "idle",
	CHECKING: "checking",
	INSTALLING: "installing",
	ACTIVATING: "activating",
	SETTING_UP: "setting_up",
	COMPLETE: "complete",
	ERROR: "error",
	RELOADING: "reloading",
};

/**
 * Hook for managing WordPress plugins with step tracking
 *
 * @param {Object} options - Configuration options
 * @param {Function} options.onSuccess - Callback for successful operation
 * @param {Function} options.onError - Callback for errors
 * @param {Function} options.onStepChange - Callback fired when step changes
 * @param {boolean} options.reloadAfterInstall - Whether to reload the page after installation
 * @param {Object} options.redirectParams - URL parameters to append when reloading
 * @param {boolean} options.showNotices - Whether to show success/error notices
 * @returns {Object} Plugin management methods and state
 */
export const usePluginManager = ({
	onSuccess,
	onError,
	onStepChange,
	reloadAfterInstall = true,
	redirectParams = {},
	showNotices = false,
} = {}) => {
	// Track the current operation step
	const [currentStep, setCurrentStep] = useState(PLUGIN_STEPS.IDLE);

	// Track the currently processing plugin
	const [processingPlugin, setProcessingPlugin] = useState(null);

	// Track detailed status of the operation
	const [operationDetails, setOperationDetails] = useState({});

	// Notices
	const { createErrorNotice, createSuccessNotice } = useDispatch(noticesStore);

	// Editor state and actions
	const { hasUnsavedChanges } = useSelect((select) => ({
		hasUnsavedChanges: select(editorStore).hasChangedContent(),
	}));

	const { savePost: dispatchSavePost } = useDispatch(editorStore);
	const { setIsPluginInstalling } = useDispatch(nfdPatternsStore);

	// Get active category for redirect
	const { activePatternsCategory } = useSelect((select) => ({
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
	}));

	/**
	 * Update the current step and trigger callback if provided
	 *
	 * @param {string} step - The new step
	 * @param {Object} details - Additional details about the step
	 */
	const updateStep = useCallback(
		(step, details = {}) => {
			setCurrentStep(step);
			setOperationDetails((prev) => ({ ...prev, ...details }));

			if (typeof onStepChange === "function") {
				// Use details.plugin if available, otherwise fall back to processingPlugin
				const pluginToReport = details.plugin || processingPlugin;
				onStepChange(step, pluginToReport, details);
			}
		},
		[onStepChange, processingPlugin]
	);

	/**
	 * Check status of a single plugin
	 *
	 * @param {Object|string} plugin - Plugin to check
	 * @returns {Promise<Object>} Status information
	 */
	const checkPlugin = useCallback(
		async (plugin) => {
			setProcessingPlugin(plugin);
			updateStep(PLUGIN_STEPS.CHECKING, { plugin });

			try {
				const response = await fetcher({
					path: "/nfd-wonder-blocks/v1/plugin/status",
					method: "POST",
					data: { plugin },
				});

				updateStep(PLUGIN_STEPS.IDLE, { status: response.status });
				return response;
			} catch (error) {
				updateStep(PLUGIN_STEPS.ERROR, { error });
				console.warn("Error checking plugin status:", error);

				if (typeof onError === "function") {
					onError(error, plugin, PLUGIN_STEPS.CHECKING);
				}

				return { status: "unknown", error };
			}
		},
		[updateStep, onError]
	);

	/**
	 * Check status of multiple plugins
	 *
	 * @param {Array} plugins - List of plugins to check
	 * @returns {Promise<Object>} Status information for each plugin
	 */
	const checkPlugins = useCallback(
		async (plugins) => {
			if (!plugins || !plugins.length) return {};

			updateStep(PLUGIN_STEPS.CHECKING, { plugins });
			const results = {};
			let hasError = false;

			try {
				// Process each plugin individually for better tracking
				for (const plugin of plugins) {
					const slug = typeof plugin === "string" ? plugin : plugin.slug;
					const result = await checkPlugin(plugin);
					results[slug] = result.status;

					// Check if this plugin had an error
					if (result.error) {
						hasError = true;
					}
				}

				// Only update to IDLE if no errors occurred
				if (!hasError) {
					updateStep(PLUGIN_STEPS.IDLE, { results });
				}
				return results;
			} catch (error) {
				updateStep(PLUGIN_STEPS.ERROR, { error });
				console.warn("Error checking plugins status:", error);

				if (typeof onError === "function") {
					onError(error, plugins, PLUGIN_STEPS.CHECKING);
				}

				return results;
			}
		},
		[checkPlugin, updateStep, onError]
	);

	/**
	 * Install a single plugin
	 *
	 * @param {Object|string} plugin - Plugin to install
	 * @param {boolean} activate - Whether to activate the plugin after installation
	 * @returns {Promise<Object>} Installation result
	 */
	const installPlugin = useCallback(
		async (plugin, activate = true) => {
			setProcessingPlugin(plugin);
			updateStep(PLUGIN_STEPS.INSTALLING, { plugin });
			setIsPluginInstalling(true);

			try {
				const response = await fetcher({
					path: "/nfd-wonder-blocks/v1/plugin/install",
					method: "POST",
					data: {
						plugin,
						activate,
					},
				});

				if (response.success) {
					if (showNotices) {
						createSuccessNotice(__("Plugin installed successfully.", "nfd-wonder-blocks"), {
							type: "snackbar",
						});
					}

					updateStep(activate ? PLUGIN_STEPS.COMPLETE : PLUGIN_STEPS.IDLE, { response });

					if (typeof onSuccess === "function") {
						onSuccess(plugin, PLUGIN_STEPS.INSTALLING);
					}
				} else {
					updateStep(PLUGIN_STEPS.ERROR, { error: "Installation failed" });

					if (showNotices) {
						createErrorNotice(
							__("Failed to install plugin. Please try again.", "nfd-wonder-blocks"),
							{ type: "snackbar" }
						);
					}
				}

				return response;
			} catch (error) {
				updateStep(PLUGIN_STEPS.ERROR, { error: error.message ?? "Unknown error" });
				console.warn("Plugin installation error:", error);

				if (showNotices) {
					createErrorNotice(
						__("Failed to install plugin. Please try again.", "nfd-wonder-blocks"),
						{ type: "snackbar" }
					);
				}

				if (typeof onError === "function") {
					onError(error, plugin, PLUGIN_STEPS.INSTALLING);
				}

				return { success: false, error };
			} finally {
				setIsPluginInstalling(false);
			}
		},
		[
			updateStep,
			setIsPluginInstalling,
			createSuccessNotice,
			createErrorNotice,
			onSuccess,
			onError,
			showNotices,
		]
	);

	/**
	 * Activate a single plugin
	 *
	 * @param {Object|string} plugin - Plugin to activate
	 * @returns {Promise<Object>} Activation result
	 */
	const activatePlugin = useCallback(
		async (plugin) => {
			setProcessingPlugin(plugin);
			updateStep(PLUGIN_STEPS.ACTIVATING, { plugin });

			try {
				const response = await fetcher({
					path: "/nfd-wonder-blocks/v1/plugin/activate",
					method: "POST",
					data: { plugin },
				});

				if (response.success) {
					if (showNotices) {
						createSuccessNotice(__("Plugin activated successfully.", "nfd-wonder-blocks"), {
							type: "snackbar",
						});
					}

					updateStep(PLUGIN_STEPS.IDLE, { response });

					if (typeof onSuccess === "function") {
						onSuccess(plugin, PLUGIN_STEPS.ACTIVATING);
					}
				} else {
					updateStep(PLUGIN_STEPS.ERROR, { error: "Activation failed" });

					if (showNotices) {
						createErrorNotice(
							__("Failed to activate plugin. Please try again.", "nfd-wonder-blocks"),
							{ type: "snackbar" }
						);
					}
				}

				return response;
			} catch (error) {
				updateStep(PLUGIN_STEPS.ERROR, { error });
				console.warn("Plugin activation error:", error);

				if (showNotices) {
					createErrorNotice(
						__("Failed to activate plugin. Please try again.", "nfd-wonder-blocks"),
						{ type: "snackbar" }
					);
				}

				if (typeof onError === "function") {
					onError(error, plugin, PLUGIN_STEPS.ACTIVATING);
				}

				return { success: false, error };
			}
		},
		[updateStep, createSuccessNotice, createErrorNotice, onSuccess, onError, showNotices]
	);

	/**
	 * Setup a single plugin integration
	 *
	 * @param {Object|string} plugin - Plugin to setup
	 * @returns {Promise<Object>} Setup result
	 */
	const setupPlugin = useCallback(
		async (plugin) => {
			setProcessingPlugin(plugin);
			updateStep(PLUGIN_STEPS.SETTING_UP, { plugin });

			try {
				const response = await fetcher({
					path: "/nfd-wonder-blocks/v1/plugin/setup",
					method: "POST",
					data: { plugin },
				});

				updateStep(PLUGIN_STEPS.IDLE, { response });

				if (response.success && typeof onSuccess === "function") {
					onSuccess(plugin, PLUGIN_STEPS.SETTING_UP);
				}

				return response;
			} catch (error) {
				updateStep(PLUGIN_STEPS.ERROR, { error });
				console.warn("Plugin setup error:", error);

				if (typeof onError === "function") {
					onError(error, plugin, PLUGIN_STEPS.SETTING_UP);
				}

				return { success: false, error };
			}
		},
		[updateStep, onSuccess, onError]
	);

	/**
	 * Helper function to handle page reload with parameters
	 */
	const handleReload = useCallback(async () => {
		updateStep(PLUGIN_STEPS.RELOADING, {
			progress: 1,
			message: __("Page is reloading to apply changes...", "nfd-wonder-blocks"),
		});

		try {
			// Save post if there are unsaved changes before reloading
			if (hasUnsavedChanges) {
				await dispatchSavePost();
			}
		} catch (error) {
			console.warn("Error saving before reload:", error);
			// Continue with reload even if save fails
		}

		// Get the current URL search parameters
		const searchParams = new URLSearchParams(window.location.search);

		// Append category parameter
		if (activePatternsCategory) {
			searchParams.set("wb-category", activePatternsCategory);
		}

		// Append custom redirect parameters
		if (redirectParams) {
			Object.entries(redirectParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					searchParams.set(key, value);
				}
			});
		}

		// Clear library filter if needed
		searchParams.set("wb-library", "");
		searchParams.set("_t", Date.now());

		const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

		window.location.href = newUrl;
	}, [activePatternsCategory, redirectParams, hasUnsavedChanges, dispatchSavePost]);

	/**
	 * Complete plugin processing in one call with step-by-step progress tracking
	 *
	 * @param {Object|string} plugin - Plugin to process
	 * @returns {Promise<Object>} Processing result with detailed steps
	 */
	const processPlugin = useCallback(
		async (plugin) => {
			// Set the plugin we're working on
			setProcessingPlugin(plugin);

			// Track overall progress
			const result = {
				slug: typeof plugin === "string" ? plugin : plugin.slug,
				steps: {},
				success: false,
				stepsCompleted: 0,
				totalSteps: 4, // Check, Install, Activate, Setup
				currentStep: "",
			};

			try {
				// Step 1: Check plugin status
				result.currentStep = "checking";
				updateStep(PLUGIN_STEPS.CHECKING, { plugin, progress: 0.25 });

				const statusData = await checkPlugin(plugin);
				result.steps.check = true;
				result.initialStatus = statusData.status;
				result.stepsCompleted++;

				// Determine next steps based on status
				const needsInstall = !plugin.status || plugin.status === "not_installed";
				const needsActivation = (!needsInstall && plugin.status === "inactive") || needsInstall;

				// Step 2: Install if needed
				if (needsInstall) {
					result.currentStep = "installing";
					updateStep(PLUGIN_STEPS.INSTALLING, { plugin, progress: 0.5 });

					const installData = await installPlugin(plugin, false);
					result.steps.install = installData.success;
					result.stepsCompleted++;

					// If installation fails, return early
					if (!installData.success) {
						result.error = "Installation failed";
						return result;
					}
				} else {
					// Skip install step
					result.steps.install = "skipped";
					result.stepsCompleted++;
				}

				// Step 3: Activate if needed (and not auto-activated during install)
				if (needsActivation || (needsInstall && result.steps.install === "skipped")) {
					result.currentStep = "activating";
					updateStep(PLUGIN_STEPS.ACTIVATING, { plugin, progress: 0.75 });

					const activateData = await activatePlugin(plugin);
					result.steps.activate = activateData.success;
					result.stepsCompleted++;

					// If activation fails, return early
					if (!activateData.success) {
						result.error = "Activation failed";
						return result;
					}
				} else {
					// Skip activate step
					result.steps.activate = "skipped";
					result.stepsCompleted++;
				}

				// Step 4: Setup the plugin
				result.currentStep = "setting_up";
				updateStep(PLUGIN_STEPS.SETTING_UP, { plugin, progress: 0.9 });

				const setupData = await setupPlugin(plugin);
				result.steps.setup = setupData.success;
				result.stepsCompleted++;

				// Final status update
				result.success = true;
				result.finalStatus = "active";
				result.progress = 1;

				updateStep(PLUGIN_STEPS.COMPLETE, {
					plugin,
					response: result,
					progress: 1,
				});

				if (showNotices) {
					createSuccessNotice(__("Plugin processed successfully.", "nfd-wonder-blocks"), {
						type: "snackbar",
					});
				}

				if (typeof onSuccess === "function") {
					onSuccess(plugin, PLUGIN_STEPS.COMPLETE, result);
				}

				// Handle reload if requested - add delay for plugin processing
				if (reloadAfterInstall) {
					// Determine delay based on plugin type
					const pluginSlug = typeof plugin === "string" ? plugin : plugin.slug;
					const delayMap = {
						"wordpress-seo-premium": 3000, // Yoast Premium needs more time for block registration
						jetpack: 2500, // Jetpack needs time for modules
						woocommerce: 2000, // WooCommerce has many blocks
						default: 1500, // Default delay for other plugins
					};

					const delay = delayMap[pluginSlug] || delayMap.default;

					updateStep(PLUGIN_STEPS.RELOADING, {
						plugin,
						progress: 0.95,
						message: __("Waiting for plugin to initialize before reload...", "nfd-wonder-blocks"),
					});

					// Add delay to allow WordPress to fully process plugin activation
					await new Promise((resolve) => setTimeout(resolve, delay));
					await handleReload();
				}

				return result;
			} catch (error) {
				// Track which step had an error
				result.error = `Error during ${result.currentStep}`;
				result.errorDetails = error;

				updateStep(PLUGIN_STEPS.ERROR, {
					error,
					plugin,
					failedStep: result.currentStep,
					progress: result.stepsCompleted / result.totalSteps,
				});

				console.warn(`Plugin processing error during ${result.currentStep}:`, error);

				if (showNotices) {
					createErrorNotice(
						__("Failed to process plugin. Please try again.", "nfd-wonder-blocks"),
						{ type: "snackbar" }
					);
				}

				if (typeof onError === "function") {
					onError(error, plugin, result.currentStep);
				}

				return result;
			}
		},
		[
			checkPlugin,
			installPlugin,
			activatePlugin,
			setupPlugin,
			updateStep,
			createSuccessNotice,
			createErrorNotice,
			onSuccess,
			onError,
			showNotices,
			reloadAfterInstall,
			handleReload,
		]
	);

	/**
	 * Process multiple plugins in sequence
	 *
	 * @param {Array} plugins - Array of plugins to process
	 * @returns {Promise<Object>} Processing results
	 */
	const processPlugins = useCallback(
		async (plugins) => {
			if (!plugins || !plugins.length) return {};

			const results = {};

			try {
				// Process each plugin in sequence
				for (const plugin of plugins) {
					const slug = typeof plugin === "string" ? plugin : plugin.slug;
					results[slug] = await processPlugin(plugin);
				}

				return results;
			} catch (error) {
				console.warn("Error processing multiple plugins:", error);
				return results;
			}
		},
		[processPlugin]
	);

	/**
	 * Install and activate plugins (legacy support)
	 *
	 * @param {Array} plugins - List of plugins to install/activate
	 * @returns {Promise<boolean>} Success state
	 */
	const installAndActivatePlugins = useCallback(
		async (plugins) => {
			if (!plugins || !plugins.length) return false;

			// For single plugin, use processPlugin directly
			if (plugins.length === 1) {
				const result = await processPlugin(plugins[0]);
				return result.success;
			}

			// For multiple plugins
			const results = await processPlugins(plugins);
			const success = Object.values(results).every((result) => result.success);

			// Handle reload if requested and successful
			if (success && reloadAfterInstall) {
				await handleReload();
			}

			return success;
		},
		[processPlugin, processPlugins, reloadAfterInstall, handleReload]
	);

	return {
		currentStep,
		processingPlugin,
		operationDetails,
		isIdle: currentStep === PLUGIN_STEPS.IDLE,
		isChecking: currentStep === PLUGIN_STEPS.CHECKING,
		isInstalling: currentStep === PLUGIN_STEPS.INSTALLING,
		isActivating: currentStep === PLUGIN_STEPS.ACTIVATING,
		isSettingUp: currentStep === PLUGIN_STEPS.SETTING_UP,
		isReloading: currentStep === PLUGIN_STEPS.RELOADING,
		isComplete: currentStep === PLUGIN_STEPS.COMPLETE,
		hasError: currentStep === PLUGIN_STEPS.ERROR,
		isBusy:
			currentStep !== PLUGIN_STEPS.IDLE &&
			currentStep !== PLUGIN_STEPS.COMPLETE &&
			currentStep !== PLUGIN_STEPS.ERROR,
		checkPlugin,
		checkPlugins,
		installPlugin,
		activatePlugin,
		setupPlugin,
		processPlugin,
		processPlugins,
		// Legacy support
		installAndActivatePlugins,
		activatePluginsOnly: activatePlugin,
		installPluginsOnly: installPlugin,
		// Reset method
		reset: () => updateStep(PLUGIN_STEPS.IDLE),
	};
};
