/**
 * WordPress dependencies
 */
import { SVG } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ReactComponent as JetpackSVG } from "./../svg/JetpackLogo.svg";
import { ReactComponent as WooCommerceSVG } from "./../svg/WooCommerceLogo.svg";

/**
 * PluginLogo Component
 * Dynamically displays an SVG logo based on the plugin's slug.
 *
 * @param {Object} props - Component props.
 * @param {string} props.plugin - The plugin slug or identifier.
 * @param {number|string} [props.width] - The optional width of the SVG.
 * @param {number|string} [props.height] - The optional height of the SVG.
 * @returns {JSX.Element|null} The SVG logo or null if no logo is found.
 */
const PluginLogo = ({ plugin, width, height }) => {
	const logos = {
		jetpack: JetpackSVG,
		woocommerce: WooCommerceSVG,
	};

	const Logo = logos[plugin] || null;

	if (!Logo) {
		return null; // Return null if no logo is found
	}

	return <Logo {...(width && { width })} {...(height && { height })} />;
};

export default PluginLogo;
