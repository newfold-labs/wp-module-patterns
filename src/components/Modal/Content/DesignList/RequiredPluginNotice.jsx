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
				{plugin.logo && <PluginLogo plugin={plugin.logo} height="20" />}

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

	const messageTemplate =
		plugin.status === "active"
			? __("This pattern is powered by <strong>%s</strong> plugin.", "nfd-wonder-blocks")
			: __("This pattern requires <strong>%s</strong> plugin.", "nfd-wonder-blocks");

	const message = createInterpolateElement(
		sprintf(
			// translators: %s: plugin name.
			messageTemplate,
			pluginName
		),
		{ strong: <strong>{pluginName}</strong> }
	);

	const linkProps = plugin.ctbId ? { "data-ctb-id": plugin.ctbId } : {};

	return (
		<p>
			{message}
			{plugin.url && plugin.isPremium && (
				<>
					{" "}
					<a
						href={plugin.url ?? "#"}
						className="nfd-required-plugin-notice__learn-more"
						target="_blank"
						{...linkProps}
					>
						{__("Learn more", "nfd-wonder-blocks")} <ArrowRight size={16} />
					</a>
				</>
			)}
		</p>
	);
};

export default RequiredPluginNotice;
