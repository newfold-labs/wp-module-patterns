/**
 * External dependencies
 */
import { InfoIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import InstallPluginsButton from "./InstallPluginsButton";

const RequiredPluginManager = ({ item }) => {
	const [isPluginResolved, setIsPluginResolved] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { isSaving } = useSelect((select) => ({
		isSaving: select(editorStore).isSavingPost(),
	}));

	const requirements = item?.plugin_requirements || [];

	useEffect(() => {
		const allPluginsActive = requirements.every((plugin) => plugin.status === "active");
		setIsPluginResolved(allPluginsActive);
	}, [requirements]);

	const onContinueWithout = () => {
		setIsPluginResolved(true);
	};

	const isBusy = isLoading || isSaving;

	if (isPluginResolved) {
		return null;
	}

	return (
		<div className="nfd-wba-plugins-required__overlay nfd-wba-absolute nfd-wba-inset-0 nfd-wba-bg-gray-300/50 nfd-wba-z-20">
			<div className="nfd-wba-plugins-required__alert">
				<InfoIcon className="nfd-wba-mt-1" size={16} />

				<div>
					<strong>Plugins required</strong>

					<p className="nfd-wba-text-neutral-500">JetPack plugin is required.</p>

					<div className="nfd-wba-flex nfd-wba-mt-2.5 nfd-wba-gap-3 nfd-wba-items-center">
						<InstallPluginsButton
							plugins={requirements}
							setIsLoading={setIsLoading}
							isBusy={isBusy}
							disabled={isBusy}
						/>

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
