/**
 * External dependencies
 */
import { ArrowRight } from "lucide-react";

/**
 * WordPress dependencies
 */
import { createInterpolateElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import PluginLogo from "../../../PluginLogo";
import PremiumBadge from "../../../PremiumBadge";

const RequiredPluginNotice = ({ plugin }) => {
	return (
		<div className="nfd-required-plugin-notice">
			<div className="nfd-required-plugin-notice__icon">
				<PluginLogo plugin={plugin.plsProviderName || plugin.slug} height="20" />

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

	// Using createInterpolateElement for better translation support
	const message = createInterpolateElement(
		sprintf(
			// translators: %s: plugin name.
			__("This pattern requires <strong>%s</strong> plugin.", "nfd-wonder-blocks"),
			pluginName
		),
		{
			strong: <strong>{pluginName}</strong>,
		}
	);

	// Determine if we need to add data-ctb-id attribute
	const linkProps = plugin.isPremium && plugin.ctbId ? { "data-ctb-id": plugin.ctbId } : {};

	return (
		<p>
			{message}{" "}
			<a href={plugin.url ?? "#"} className="nfd-required-plugin-notice__learn-more" {...linkProps}>
				{__("Learn more", "nfd-wonder-blocks")} <ArrowRight size={16} />
			</a>
		</p>
	);
};

export default RequiredPluginNotice;
