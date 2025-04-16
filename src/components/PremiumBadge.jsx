/**
 * External dependencies
 */
import { CrownIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

const PremiumBadge = ({ variant = "tagline" }) => {
	const premiumTagline = __("Premium", "nfd-wonder-blocks");

	if (variant === "tagline") {
		return (
			<span className="nfd-premium-badge--tagline">
				<CrownIcon size={10} />
				{premiumTagline}
			</span>
		);
	}

	if (variant === "logo") {
		return (
			<span className="nfd-premium-badge--logo">
				<CrownIcon size={16} />
			</span>
		);
	}

	return null;
};

export default PremiumBadge;
