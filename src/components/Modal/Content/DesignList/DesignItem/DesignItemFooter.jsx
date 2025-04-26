/**
 * External dependencies
 */
import classNames from "classnames";
import { DownloadIcon, HeartIcon, HeartOffIcon, PlusIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";

/**
 * Internal dependencies
 */
import RequiredPluginNotice from "../RequiredPluginNotice";

const DesignItemFooter = ({
	item,
	isFavorite,
	shouldShowTrash,
	insertDesignHandler,
	favoritesClickHandler,
	isBusyState,
	hasInactivePlugins,
}) => {
	return (
		<div className="nfd-wba-flex nfd-wba-py-3 nfd-wba-px-5 nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-1 nfd-wba-border-0 nfd-wba-border-grey-b nfd-wba-border-solid nfd-wba-border-t">
			<div>
				{item?.plugin_requirements?.length > 0 && (
					<RequiredPluginNotice plugin={item?.plugin_requirements[0]} />
				)}
			</div>

			<div className="nfd-wba-flex nfd-wba-gap-0.5 nfd-wba-shrink-0 nfd-wba-items-center">
				{shouldShowTrash && (
					<Button
						className="nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-text-gray-900 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75"
						label={__("Remove from favorites", "nfd-wonder-blocks")}
						showTooltip={true}
						onClick={() => favoritesClickHandler(true)}
						icon={<HeartOffIcon className="nfd-wba-size-5 !nfd-wba-fill-none" />}
					/>
				)}
				{!shouldShowTrash && (
					<Button
						className={classNames(
							"nfd-wba-size-9 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75",
							isFavorite
								? "nfd-wba-text-red-500 hover:nfd-wba-text-red-600 hover:nfd-wba-bg-red-50"
								: "nfd-wba-text-gray-500 hover:nfd-wba-text-red-500 hover:nfd-wba-bg-gray-100"
						)}
						label={
							isFavorite
								? __("Added to favorites", "nfd-wonder-blocks")
								: __("Add to favorites", "nfd-wonder-blocks")
						}
						showTooltip={true}
						onClick={() => favoritesClickHandler(false)}
						icon={
							<HeartIcon
								className={classNames("nfd-wba-size-5", !isFavorite && "!nfd-wba-fill-none")}
							/>
						}
					/>
				)}
				<Button
					className="nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-text-gray-900 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75"
					isBusy={isBusyState}
					isPressed={isBusyState}
					label={
						hasInactivePlugins
							? __("Install Required Plugins", "nfd-wonder-blocks")
							: __("Add pattern to page", "nfd-wonder-blocks")
					}
					showTooltip={true}
					onClick={insertDesignHandler}
					icon={
						hasInactivePlugins ? (
							<DownloadIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-5" />
						) : (
							<PlusIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-5" />
						)
					}
				/>
			</div>
		</div>
	);
};

export default DesignItemFooter;
