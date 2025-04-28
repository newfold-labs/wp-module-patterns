/**
 * External dependencies
 */
import { DownloadIcon, HeartIcon, PlusIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";

/**
 * Internal dependencies
 */
import { usePluginRequirements } from "../../../../../hooks/usePluginRequirements";
import PremiumBadge from "../../../../PremiumBadge";

/**
 * Design Controls Component
 */
const DesignItemControls = ({
	item,
	isFavorite,
	insertDesignHandler,
	favoritesClickHandler,
	isBusyState,
	hasInactivePlugins,
	hasPremiumPlugins,
}) => {
	const { premiumButtonProps, shouldUseOnClick } = usePluginRequirements(item);

	return (
		<div className="nfd-wba-design-item--overlay">
			{hasPremiumPlugins && (
				<div className="nfd-wba-absolute nfd-wba-top-2 nfd-wba-right-2 nfd-wba-z-20">
					<PremiumBadge variant="logo" />
				</div>
			)}

			<div className="nfd-wba-design-item--overlay__buttons">
				<Button
					isBusy={isBusyState}
					isPressed={isBusyState}
					label={
						hasInactivePlugins
							? __("Install Required Plugins", "nfd-wonder-blocks")
							: __("Add pattern to page", "nfd-wonder-blocks")
					}
					showTooltip={true}
					{...(shouldUseOnClick ? { onClick: insertDesignHandler } : {})}
					icon={
						hasInactivePlugins ? (
							<DownloadIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-6" />
						) : (
							<PlusIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-6" />
						)
					}
					{...premiumButtonProps}
				/>
				<Button
					className={classNames(
						isFavorite
							? "nfd-wba-cursor-default nfd-wba-bg-gray-100 !nfd-wba-text-red-600"
							: "nfd-wba-cursor-not-pointer hover:nfd-wba-text-red-600"
					)}
					showTooltip={true}
					label={
						isFavorite
							? __("Added to favorites", "nfd-wonder-blocks")
							: __("Add to favorites", "nfd-wonder-blocks")
					}
					onClick={() => favoritesClickHandler(false)}
					icon={
						<HeartIcon
							className={classNames(
								" nfd-wba-shrink-0 nfd-wba-size-6",
								!isFavorite && "!nfd-wba-fill-none"
							)}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default DesignItemControls;
