/**
 * WordPress dependencies
 */
import { createRoot } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import InstallationProgressModal from "../components/InstallationProgressModal";
import { store as nfdPatternsStore } from "../store";

// Global state for installation progress modal
let installationModalRoot = null;
let messageEventListener = null;

/**
 * Set up the postMessage listener for CTB success events
 * Only listens when the Wonder Blocks modal is open
 */
export const setupCTBPostMessageListener = () => {
	// Check modal state and add/remove listener accordingly
	const checkModalState = () => {
		// Get the current modal state from the store
		const isModalOpen = window.wp?.data?.select(nfdPatternsStore)?.isModalOpen();

		if (isModalOpen && !messageEventListener) {
			// Add listener when modal opens
			messageEventListener = (event) => {
				// Basic security checks
				if (!event.data || typeof event.data !== "object") {
					return;
				}

				// Listen for ctbSuccess message
				if (event.data.type === "ctbSuccess") {
					handleCTBSuccess(event.data);
				}
			};

			window.addEventListener("message", messageEventListener);
			console.log("CTB postMessage listener added");
		} else if (!isModalOpen && messageEventListener) {
			// Remove listener when modal closes
			window.removeEventListener("message", messageEventListener);
			messageEventListener = null;
			console.log("CTB postMessage listener removed");
		}
	};

	// Check immediately
	checkModalState();

	// Set up observer to watch for modal state changes
	if (window.wp?.data?.subscribe) {
		window.wp.data.subscribe(() => {
			checkModalState();
		});
	}
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

	installationModalRoot.render(
		<InstallationProgressModal
			pluginData={pluginData}
			onClose={() => hideInstallationProgressModal()}
		/>
	);
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
