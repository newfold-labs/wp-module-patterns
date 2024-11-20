/**
 * External dependencies
 */
import { PlugIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { useEffect, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import InstallPluginsButton from "./InstallPluginsButton";
import { store as nfdPatternsStore } from "../../../../store";

const RequiredPluginManager = ({ item }) => {
	const [isPluginResolved, setIsPluginResolved] = useState(false);

	const { isSaving, isPluginInstalling } = useSelect((select) => ({
		isSaving: select(editorStore).isSavingPost(),
		isPluginInstalling: select(nfdPatternsStore).isPluginInstalling(),
	}));

	const requirements = item?.plugin_requirements || [];

	useEffect(() => {
		const allPluginsActive = requirements.every((plugin) => plugin.status === "active");
		setIsPluginResolved(allPluginsActive);
	}, [requirements]);

	const onContinueWithout = () => {
		setIsPluginResolved(true);
	};

	const isBusy = isPluginInstalling || isSaving;

	const generateRequiredPluginsMessage = (requiredPlugins) => {
		if (requiredPlugins.length === 0) {
			return __("No plugins required.", "nfd-wonder-blocks");
		} else if (requiredPlugins.length === 1) {
			return sprintf(__("Requires %s.", "nfd-wonder-blocks"), requiredPlugins[0].name);
		} else {
			const pluginNames = requiredPlugins.map((plugin) => plugin.name);
			const lastPlugin = pluginNames.pop(); // Remove the last plugin name
			return sprintf(
				__("Requires %s and %s.", "nfd-wonder-blocks"),
				pluginNames.join(", "),
				lastPlugin
			);
		}
	};

	if (isPluginResolved) {
		return null;
	}

	return (
		<div className="nfd-wba-plugins-required__overlay nfd-wba-absolute nfd-wba-inset-0 nfd-wba-bg-gray-300/50 nfd-wba-z-20">
			<div className="nfd-wba-plugins-required__alert">
				<PlugIcon className="nfd-wba-mt-1" size={16} />

				<div>
					<strong>{__("WordPress Plugins Required", "nfd-wonder-blocks")}</strong>

					<p className="nfd-wba-text-neutral-500">{generateRequiredPluginsMessage(requirements)}</p>

					<div className="nfd-wba-flex nfd-wba-mt-2.5 nfd-wba-gap-3 nfd-wba-items-center">
						<InstallPluginsButton plugins={requirements} isBusy={isBusy} disabled={isBusy} />

						<Button
							variant="link"
							className="!nfd-wba-text-gray-600"
							onClick={onContinueWithout}
							disabled={isBusy}
						>
							{__("Maybe later", "nfd-wonder-blocks")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequiredPluginManager;
