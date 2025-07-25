/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { useEffect, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { DEFAULT_PATTERNS_CATEGORY } from "../../../constants";
import { PLUGIN_STEPS, usePluginManager } from "../../../hooks/usePluginManager";
import { store as nfdPatternsStore } from "../../../store";
import Spinner from "./Spinner";

const PluginInstallationProgress = ({ pluginData, onClose }) => {
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
	const currentCategory =
		activePatternsCategory || searchParams.get("wb-category") || DEFAULT_PATTERNS_CATEGORY;

	// Setup plugin manager with proper callbacks
	// Only add redirect parameters if the Wonder Blocks modal is open
	const redirectParams = isModalOpen
		? {
				"wb-library": "patterns",
				"wb-category": currentCategory,
			}
		: {};

	const { currentStep, hasError, isReloading, processPlugin } = usePluginManager({
		reloadAfterInstall: true,
		redirectParams,
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
		const pluginName =
			pluginData?.pluginName || pluginData?.plugin || __("the plugin", "nfd-wonder-blocks");

		if (currentStep === PLUGIN_STEPS.COMPLETE) {
			return sprintf(__("All done!", "nfd-wonder-blocks"), pluginName);
		}

		if (currentStep === PLUGIN_STEPS.ERROR) {
			return __("Installation failed", "nfd-wonder-blocks");
		}

		// All other states (loading)
		return sprintf(__("Installing %s", "nfd-wonder-blocks"), pluginName);
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
				return __("Reloading the page to apply the changes...", "nfd-wonder-blocks");
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

	return (
		<div className="nfd-wba-installation-modal-content nfd-wba-flex nfd-wba-flex-col nfd-wba-justify-center nfd-wba-items-center">
			<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-flex-col">
				<Spinner size={56} state={hasError ? "error" : isReloading ? "success" : "loading"} />

				<h1 className="nfd-wba-text-2xl nfd-wba-text-balance nfd-wba-font-medium nfd-wba-leading-tight nfd-wba-mt-8 nfd-wba-text-gray-900">
					{getModalTitle()}
				</h1>

				<p className="nfd-wba-text-base nfd-wba-text-balance nfd-wba-leading-relaxed nfd-wba-text-gray-700 nfd-wba-m-0">
					{getModalMessage()}
				</p>

				{hasError && (
					<Button
						variant="primary"
						className="nfd-wba-justify-center nfd-wba-w-3/4 nfd-wba-mt-6"
						onClick={onClose}
					>
						{__("Close", "nfd-wonder-blocks")}
					</Button>
				)}
			</div>
		</div>
	);
};

export default PluginInstallationProgress;
