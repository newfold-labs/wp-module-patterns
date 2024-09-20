/**
 * External dependencies
 */
import classnames from "classnames";

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

const InstallPluginsButton = ({ plugins, isBusy, ...otherProps }) => {
	const { createErrorNotice } = useDispatch(noticesStore);
	const [buttonClicked, setButtonClicked] = useState(false);

	const onActivateAndInstall = async () => {
		setIsPluginInstalling(true);
		setButtonClicked(true);

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
			console.warn(error);
		}

		setIsPluginInstalling(false);
		setButtonClicked(false);
	};

	const { hasUnsavedChanges, activePatternsCategory } = useSelect((select) => ({
		hasUnsavedChanges: select(editorStore).hasChangedContent(),
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
	}));

	const { savePost: dispatchSavePost } = useDispatch(editorStore);
	const { setIsPluginInstalling } = useDispatch(nfdPatternsStore);

	return (
		<Button
			variant="primary"
			size="small"
			className={classnames(
				"!nfd-wba-text-[13px] !nfd-wba-px-3 !nfd-wba-py-3.5 !nfd-wba-text-dark-lighter !nfd-wba-rounded-sm !nfd-wba-bg-gray-100",
				!isBusy && "hover:!nfd-wba-bg-gray-200",
				isBusy && "!nfd-wba-cursor-wait !nfd-wba-text-gray-500"
			)}
			onClick={onActivateAndInstall}
			{...otherProps}
		>
			{!buttonClicked ? (
				<span>{__("Install now", "nfd-wonder-blocks")}</span>
			) : (
				<span>{__("Installing...", "nfd-wonder-blocks")}</span>
			)}
		</Button>
	);
};

export default InstallPluginsButton;
