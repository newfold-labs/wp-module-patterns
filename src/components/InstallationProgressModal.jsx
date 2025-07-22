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
				return __("Checking Plugin Status...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.INSTALLING:
				return __("Installing Plugin...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ACTIVATING:
				return __("Activating Plugin...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.SETTING_UP:
				return __("Setting Up Plugin...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.COMPLETE:
				return __("Installation Complete!", "nfd-wonder-blocks");
			case PLUGIN_STEPS.RELOADING:
				return __("Reloading Page...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return __("Installation Error", "nfd-wonder-blocks");
			default:
				return __("Installing Plugin...", "nfd-wonder-blocks");
		}
	};

	const getModalMessage = () => {
		const pluginName =
			pluginData?.pluginName || pluginData?.plugin || __("the plugin", "nfd-wonder-blocks");

		switch (currentStep) {
			case PLUGIN_STEPS.CHECKING:
				return sprintf(
					__("Checking if %s is already installed...", "nfd-wonder-blocks"),
					pluginName
				);
			case PLUGIN_STEPS.INSTALLING:
				return sprintf(__("Installing %s...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.ACTIVATING:
				return sprintf(__("Activating %s...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.SETTING_UP:
				return sprintf(__("Setting up %s...", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.COMPLETE:
				return sprintf(__("%s has been installed successfully!", "nfd-wonder-blocks"), pluginName);
			case PLUGIN_STEPS.RELOADING:
				return __("Reloading the page to apply changes...", "nfd-wonder-blocks");
			case PLUGIN_STEPS.ERROR:
				return sprintf(
					__("Failed to install %s. Please try again.", "nfd-wonder-blocks"),
					pluginName
				);
			default:
				return sprintf(__("Installing %s...", "nfd-wonder-blocks"), pluginName);
		}
	};

	const canClose = currentStep === PLUGIN_STEPS.ERROR || currentStep === PLUGIN_STEPS.IDLE;

	return (
		<WPModal
			className="nfd-wba-installation-modal"
			title={getModalTitle()}
			onRequestClose={canClose ? onClose : undefined}
			isDismissible={canClose}
			shouldCloseOnClickOutside={false}
			shouldCloseOnEsc={canClose}
		>
			<div className="nfd-wba-installation-modal-content">
				<p className="nfd-wba-mb-4">{getModalMessage()}</p>

				<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-gap-4">
					<CircularProgress
						percentage={Math.round((operationDetails?.progress || 0) * 100)}
						isError={currentStep === PLUGIN_STEPS.ERROR}
						size={80}
						strokeWidth={4}
					/>

					{currentStep !== PLUGIN_STEPS.ERROR && (
						<div className="nfd-wba-text-center">
							<p className="nfd-wba-text-sm nfd-wba-text-gray-600 nfd-wba-m-0">
								{currentStep === PLUGIN_STEPS.CHECKING &&
									__("Checking plugin status...", "nfd-wonder-blocks")}
								{currentStep === PLUGIN_STEPS.INSTALLING &&
									__("Downloading and installing...", "nfd-wonder-blocks")}
								{currentStep === PLUGIN_STEPS.ACTIVATING &&
									__("Activating plugin...", "nfd-wonder-blocks")}
								{currentStep === PLUGIN_STEPS.SETTING_UP &&
									__("Configuring plugin...", "nfd-wonder-blocks")}
								{currentStep === PLUGIN_STEPS.COMPLETE &&
									__("Installation complete!", "nfd-wonder-blocks")}
								{currentStep === PLUGIN_STEPS.RELOADING &&
									__("Reloading page...", "nfd-wonder-blocks")}
							</p>
						</div>
					)}
				</div>

				{currentStep === PLUGIN_STEPS.ERROR && (
					<div className="nfd-wba-mt-4 nfd-wba-text-center">
						<button className="nfd-wba-button nfd-wba-button-primary" onClick={onClose}>
							{__("Close", "nfd-wonder-blocks")}
						</button>
					</div>
				)}
			</div>
		</WPModal>
	);
};

export default InstallationProgressModal;
