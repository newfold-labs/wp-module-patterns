/**
 * WordPress dependencies
 */
import { createRoot } from "@wordpress/element";

/**
 * Internal dependencies
 */
import InstallationProgressModal from "../components/InstallationProgressModal";

// Global state for installation progress modal
let installationModalRoot = null;

/**
 * Set up the postMessage listener for CTB success events
 */
export const setupCTBPostMessageListener = () => {
	window.addEventListener("message", (event) => {
		// Basic security checks
		if (!event.data || typeof event.data !== "object") {
			return;
		}

		// Listen for ctbSuccess message
		if (event.data.type === "ctbSuccess") {
			handleCTBSuccess(event.data);
		}
	});
};

/**
 * Handle CTB success message and trigger plugin installation
 */
const handleCTBSuccess = async (messageData) => {
	console.log("CTB Success received:", messageData);

	// Extract plugin data from the message
	const pluginData = {
		slug: messageData.slug || "",
		plugin: messageData.plugin || "",
		basename: messageData.basename || "",
		pluginName: messageData.pluginName || "",
		activate: messageData.activate !== false, // Default to true
		queue: messageData.queue || false,
		priority: messageData.priority || 0,
		isPremium: messageData.premium || false,
	};

	if (pluginData.isPremium) {
		pluginData.plsSlug = messageData.plsSlug || messageData.plugin || "";
		pluginData.plsProviderName = messageData.plsProviderName || messageData.provider || "";
	}

	// Show installation progress modal
	showInstallationProgressModal(pluginData);
};

/**
 * Show the installation progress modal
 */
const showInstallationProgressModal = (pluginData) => {
	// Create modal container if it doesn't exist
	const modalId = "nfd-wba-installation-modal";
	let modalContainer = document.getElementById(modalId);

	if (!modalContainer) {
		modalContainer = Object.assign(document.createElement("div"), {
			id: modalId,
			className: "nfd-wba-installation-modal",
		});
		document.body.append(modalContainer);
	}

	// Create or update the React root
	if (!installationModalRoot) {
		installationModalRoot = createRoot(modalContainer);
	}

	setTimeout(() => {
		installationModalRoot.render(
			<InstallationProgressModal
				pluginData={pluginData}
				onClose={() => hideInstallationProgressModal()}
			/>
		);
	}, 0);
};

/**
 * Hide the installation progress modal
 */
const hideInstallationProgressModal = () => {
	if (installationModalRoot) {
		installationModalRoot.unmount();
		installationModalRoot = null;
	}

	const modalContainer = document.getElementById("nfd-wba-installation-modal");
	if (modalContainer) {
		modalContainer.remove();
	}
};
