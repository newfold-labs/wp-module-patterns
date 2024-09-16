/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Internal dependencies
 */
import { activatePlugins } from "../../../../helpers/pluginManager";
import { store as nfdPatternsStore } from "../../../../store";

const InstallPluginsButton = ({ plugins }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { createErrorNotice } = useDispatch(noticesStore);

	const onActivateAndInstall = async () => {
		setIsLoading(true);

		try {
			// Activate plugins
			await activatePlugins(plugins);

			// Check for unsaved changes and save the post if needed
			if (hasUnsavedChanges) {
				await dispatchSavePost();
			}

			// Get the current URL search parameters
			const searchParams = new URLSearchParams(window.location.search);

			// Append new parameters
			searchParams.set("wb-library", "");
			searchParams.set("wb-category", activePatternsCategory);

			// Reload the page with the updated parameters
			window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
		} catch (error) {
			createErrorNotice(
				__("Failed to install & activate plugins. Please try again.", "nfd-wonder-blocks"),
				{
					type: "snackbar",
				}
			);

			// eslint-disable-next-line no-console
			console.watn(error);
		}

		setIsLoading(false);
	};

	const { isSaving, hasUnsavedChanges, activePatternsCategory } = useSelect((select) => ({
		hasUnsavedChanges: select(editorStore).hasChangedContent(),
		isSaving: select(editorStore).isSavingPost(),
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
	}));

	const { savePost: dispatchSavePost } = useDispatch(editorStore);

	return (
		<Button variant="primary" isBusy={isLoading || isSaving} onClick={onActivateAndInstall}>
			{__("Install & Activate Plugins", "nfd-wonder-blocks")}
		</Button>
	);
};

export default InstallPluginsButton;
