/**
 * WordPress dependencies
 */
import { Modal as WPModal } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { __, sprintf } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { usePluginManager, PLUGIN_STEPS } from "../hooks/usePluginManager";
import { store as nfdPatternsStore } from "../store";
import PluginProgressBar, { CircularProgress } from "./PluginProgressBar";

const InstallationProgressModal = ({ pluginData, onClose }) => {
	const [isVisible, setIsVisible] = useState(true);

	// Get modal state, active category, and editor state from store
	const { isModalOpen, activePatternsCategory, hasUnsavedChanges } = useSelect((select) => ({
		isModalOpen: select(nfdPatternsStore).isModalOpen(),
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
		hasUnsavedChanges: select(editorStore).hasChangedContent(),
	}));

	// Editor actions
	const { savePost: dispatchSavePost } = useDispatch(editorStore);

	// Use store category or fallback to URL parameter or default
	const searchParams = new URLSearchParams(window?.location?.search);
	const currentCategory = activePatternsCategory || searchParams.get("wb-category") || "general";

	// Setup plugin manager with proper callbacks
	// Only add redirect parameters if the Wonder Blocks modal is open
	const redirectParams = isModalOpen
		? {
				"wb-library": "patterns",
				"wb-category": currentCategory,
			}
		: {};

	const { currentStep, operationDetails, processPlugin, isBusy } = usePluginManager({
		reloadAfterInstall: true,
		redirectParams,
		onSuccess: (plugin, step) => {
			if (step === PLUGIN_STEPS.COMPLETE) {
				// Installation completed, modal will close when page reloads
			}
		},
		onError: (error, plugin, step) => {
			console.error(`Plugin ${plugin.plugin || plugin} ${step} failed:`, error);
			// Keep modal open to show error state
		},
	});

	// Start installation when component mounts
	useEffect(() => {
		if (pluginData?.plugin) {
			processPlugin(pluginData);
		}
	}, [pluginData?.plugin]);

	// Handle unsaved changes before reload and close modal
	useEffect(() => {
		const handleReload = async () => {
			if (currentStep !== PLUGIN_STEPS.COMPLETE) return;

			try {
				// Save post if there are unsaved changes before reloading
				if (hasUnsavedChanges) {
					await dispatchSavePost();
				}
			} catch (error) {
				console.warn("Error saving before reload:", error);
				// Continue with reload even if save fails
			}

			// Close modal (page will reload anyway)
			setIsVisible(false);
		};

		handleReload();
	}, [currentStep, hasUnsavedChanges, dispatchSavePost]);

	if (!isVisible) {
		return null;
	}

	const getModalTitle = () => {
		switch (currentStep) {
			case PLUGIN_STEPS.CHECKING:
				return __("Checking Plugin Status", "nfd-wonder-blocks");
			case PLUGIN_STEPS.INSTALLING:
				return __("Installing Plugin", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ACTIVATING:
				return __("Activating Plugin", "nfd-wonder-blocks");
			case PLUGIN_STEPS.SETTING_UP:
				return __("Setting Up Plugin", "nfd-wonder-blocks");
			case PLUGIN_STEPS.COMPLETE:
				return __("Installation Complete!", "nfd-wonder-blocks");
			case PLUGIN_STEPS.RELOADING:
				return __("Reloading Page", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return __("Installation Failed", "nfd-wonder-blocks");
			default:
				return __("Installing Plugin", "nfd-wonder-blocks");
		}
	};

	const getModalMessage = () => {
		const pluginName =
			pluginData?.pluginName || pluginData?.plugin || __("the plugin", "nfd-wonder-blocks");

		switch (currentStep) {
			case PLUGIN_STEPS.CHECKING:
				return sprintf(__("Verifying %s installation status...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.INSTALLING:
				return sprintf(__("Downloading and installing %s...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.ACTIVATING:
				return sprintf(__("Activating %s...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.SETTING_UP:
				return sprintf(__("Configuring %s settings...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.COMPLETE:
				return sprintf(
					__("%s has been successfully installed and activated!", "nfd-wonder-blocks"),
					pluginName
				);
			case PLUGIN_STEPS.RELOADING:
				return __("Refreshing the page to apply all changes...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return sprintf(
					__(
						"We encountered an issue installing %s. Please try again or contact support if the problem persists.",
						"nfd-wonder-blocks"
					),
					pluginName
				);
			default:
				return sprintf(__("Setting up %s...", "nfd-wonder-blocks"), pluginName);
		}
	};

	const getStepDescription = () => {
		switch (currentStep) {
			case PLUGIN_STEPS.CHECKING:
				return __("This may take a few seconds...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.INSTALLING:
				return __("Please wait while we download the plugin files", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ACTIVATING:
				return __("Enabling plugin functionality", "nfd-wonder-blocks");
			case PLUGIN_STEPS.SETTING_UP:
				return __("Applying default configuration", "nfd-wonder-blocks");
			case PLUGIN_STEPS.COMPLETE:
				return __("Ready to use!", "nfd-wonder-blocks");
			case PLUGIN_STEPS.RELOADING:
				return __("This will only take a moment", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return __("Check your internet connection and try again", "nfd-wonder-blocks");
			default:
				return "";
		}
	};

	const canClose = currentStep === PLUGIN_STEPS.ERROR || currentStep === PLUGIN_STEPS.IDLE;
	const isError = currentStep === PLUGIN_STEPS.ERROR;
	const isComplete = currentStep === PLUGIN_STEPS.COMPLETE;

	return (
		<WPModal
			className="nfd-wba-installation-modal"
			title=""
			onRequestClose={canClose ? onClose : undefined}
			isDismissible={canClose}
			shouldCloseOnClickOutside={false}
			shouldCloseOnEsc={canClose}
			__experimentalHideHeader={true}
		>
			<div className="nfd-wba-installation-modal-content nfd-wba-p-8 nfd-wba-text-center nfd-wba-max-w-md nfd-wba-mx-auto">
				{/* Header Section */}
				<div className="nfd-wba-mb-8">
					<h2
						className={`nfd-wba-text-2xl nfd-wba-font-semibold nfd-wba-mb-3 nfd-wba-leading-tight ${
							isError
								? "nfd-wba-text-red-700"
								: isComplete
									? "nfd-wba-text-green-700"
									: "nfd-wba-text-gray-900"
						}`}
					>
						{getModalTitle()}
					</h2>
					<p
						className={`nfd-wba-text-base nfd-wba-leading-relaxed nfd-wba-mb-0 ${
							isError ? "nfd-wba-text-red-600" : "nfd-wba-text-gray-700"
						}`}
					>
						{getModalMessage()}
					</p>
				</div>

				{/* Progress Section */}
				<div className="nfd-wba-mb-8">
					<div className="nfd-wba-flex nfd-wba-justify-center nfd-wba-mb-6">
						<CircularProgress
							percentage={Math.round((operationDetails?.progress || 0) * 100)}
							isError={isError}
							size={100}
							strokeWidth={6}
						/>
					</div>

					{!isError && (
						<div className="nfd-wba-space-y-2">
							<p
								className={`nfd-wba-text-sm nfd-wba-font-medium nfd-wba-mb-1 ${
									isComplete ? "nfd-wba-text-green-600" : "nfd-wba-text-gray-900"
								}`}
							>
								{getStepDescription()}
							</p>
						</div>
					)}
				</div>

				{/* Action Section */}
				{isError && (
					<div className="nfd-wba-pt-4 nfd-wba-border-t nfd-wba-border-gray-200">
						<button
							className="nfd-wba-inline-flex nfd-wba-items-center nfd-wba-justify-center nfd-wba-px-6 nfd-wba-py-3 nfd-wba-bg-blue-600 nfd-wba-text-white nfd-wba-text-sm nfd-wba-font-medium nfd-wba-rounded-lg nfd-wba-border-0 nfd-wba-cursor-pointer nfd-wba-transition-colors nfd-wba-duration-200 hover:nfd-wba-bg-blue-700 focus:nfd-wba-outline-none focus:nfd-wba-ring-2 focus:nfd-wba-ring-blue-500 focus:nfd-wba-ring-offset-2"
							onClick={onClose}
						>
							{__("Close", "nfd-wonder-blocks")}
						</button>
					</div>
				)}

				{isComplete && (
					<div className="nfd-wba-pt-4 nfd-wba-border-t nfd-wba-border-gray-200">
						<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-2 nfd-wba-text-green-600">
							<svg className="nfd-wba-w-5 nfd-wba-h-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="nfd-wba-text-sm nfd-wba-font-medium">
								{__("Page will reload automatically", "nfd-wonder-blocks")}
							</span>
						</div>
					</div>
				)}
			</div>
		</WPModal>
	);
};

export default InstallationProgressModal;
