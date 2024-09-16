/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import InstallPluginsButton from "./InstallPluginsButton";

const RequiredPluginManager = ({ item }) => {
	const [isPluginResolved, setIsPluginResolved] = useState(false);

	const requirements = item?.plugin_requirements || [];

	useEffect(() => {
		const allPluginsActive = requirements.every((plugin) => plugin.status === "active");
		setIsPluginResolved(allPluginsActive);
	}, [requirements]);

	const onContinueWithout = () => {
		setIsPluginResolved(true);
	};

	if (isPluginResolved) {
		return null;
	}

	return (
		<div className="nfd-wba-overlay nfd-wba-bg-black nfd-wba-bg-opacity-50 nfd-wba-absolute nfd-wba-w-full nfd-wba-h-full nfd-wba-z-10 nfd-wba-flex nfd-wba-items-center nfd-wba-justify-center">
			<div className="nfd-wba-plugin-overlay nfd-wba-bg-white nfd-wba-p-6 nfd-wba-rounded-md nfd-wba-shadow-lg nfd-wba-max-w-sm nfd-wba-mx-auto nfd-wba-text-center">
				<p className="nfd-wba-text-gray-600 nfd-wba-mb-6">
					{__("The following plugins are required to use this pattern:", "nfd-wonder-blocks")}
				</p>
				<ul className="nfd-wba-list-disc nfd-wba-list-inside nfd-wba-mb-6">
					{requirements.map((plugin, index) => (
						<li key={index} className="nfd-wba-text-gray-800">
							{plugin.name}
						</li>
					))}
				</ul>
				<div className="nfd-wba-flex nfd-wba-gap-4 nfd-wba-justify-center">
					<InstallPluginsButton plugins={requirements} />

					<Button onClick={onContinueWithout}>Continue Without</Button>
				</div>
			</div>
		</div>
	);
};

export default RequiredPluginManager;
