/**
 * External dependencies
 */
import { ArrowRight } from "lucide-react";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import PluginLogo from "../../../PluginLogo";
import PremiumBadge from "../../../PremiumBadge";

const RequiredPluginNotice = ({ plugin }) => {
	return (
		<div className="nfd-required-plugin-notice">
			<div className="nfd-required-plugin-notice__icon">
				<PluginLogo plugin={plugin.slug} height="20" />

				{plugin.isPremium && <PremiumBadge variant="tagline" />}
			</div>
			<div className="nfd-required-plugin-notice__content">
				{generateRequiredPluginsMessage(plugin)}
			</div>
		</div>
	);
};

const generateRequiredPluginsMessage = (plugin) => {
	const pluginName = plugin.name || plugin.slug;
	return (
		<>
			{__("This pattern requires ", "nfd-wonder-blocks")}
			<strong>{pluginName}</strong>
			{__(" plugin.", "nfd-wonder-blocks")}

			<a href="#" className="nfd-required-plugin-notice__learn-more">
				{__("Learn more", "nfd-wonder-blocks")} <ArrowRight size={16} />
			</a>
		</>
	);
};

export default RequiredPluginNotice;
