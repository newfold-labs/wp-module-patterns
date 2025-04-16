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
import PremiumBadge from "../../../PremiumBadge";

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

	const hasPremiumPlugin = requirements.some((plugin) => plugin.isPremium);

	if (isPluginResolved) {
		return null;
	}

	return (
		<div className="nfd-wba-plugins-required__overlay nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-20">
			{hasPremiumPlugin && (
				<div className="nfd-wba-absolute nfd-wba-top-2 nfd-wba-right-2 nfd-wba-z-20">
					<PremiumBadge variant="logo" />
				</div>
			)}
		</div>
	);
};

export default RequiredPluginManager;
