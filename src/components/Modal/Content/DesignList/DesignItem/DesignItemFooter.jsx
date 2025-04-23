/**
 * External dependencies
 */
import classNames from "classnames";
import { HeartIcon, HeartOffIcon, PlusIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";

/**
 * Internal dependencies
 */
import RequiredPluginNotice from "../RequiredPluginNotice";
import { usePluginRequirementsHandler } from "../../../../../hooks/usePluginRequirementsHandler";

const DesignItemFooter = ({
	item,
	isFavorite,
	insertingDesign,
	shouldShowTrash,
	insertDesignHandler,
	favoritesClickHandler,
}) => {
	const { handlePluginRequirements, isBusyState: requirementsBusyState } =
		usePluginRequirementsHandler({
			onRequirementsMet: insertDesignHandler,
			pluginRequirements: item?.plugin_requirements || [],
		});

	const isBusyState = insertingDesign || requirementsBusyState;

	return (
		<div className="nfd-wba-flex nfd-wba-py-3 nfd-wba-px-5 nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-border-0 nfd-wba-border-grey-b nfd-wba-border-solid nfd-wba-border-t">
			<div>
				{item?.plugin_requirements?.length > 0 && (
					<RequiredPluginNotice plugin={item?.plugin_requirements[0]} />
				)}
			</div>

			<div className="nfd-wba-flex nfd-wba-gap-0.5 nfd-wba-shrink-0 nfd-wba-items-center">
				{!shouldShowTrash() && (
					<Button
						className={classNames(
							"nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-text-gray-900 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75",
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
						onClick={() => favoritesClickHandler()}
						icon={
							<HeartIcon
								className={classNames(
									" nfd-wba-shrink-0 nfd-wba-size-5",
									!isFavorite && "!nfd-wba-fill-none"
								)}
							/>
						}
					/>
				)}

				{shouldShowTrash() && (
					<Button
						className={classNames(
							"nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75 hover:nfd-wba-text-red-600"
						)}
						showTooltip={true}
						label={__("Remove from Favorites", "nfd-wonder-blocks")}
						onClick={() => favoritesClickHandler()}
						icon={<HeartOffIcon className="nfd-wba-shrink-0 nfd-wba-size-5 !nfd-wba-fill-none" />}
					/>
				)}

				<Button
					className="nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-text-gray-900 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75"
					isBusy={isBusyState}
					isPressed={insertingDesign}
					label={__("Add pattern to page", "nfd-wonder-blocks")}
					showTooltip={true}
					onClick={() => handlePluginRequirements()}
					icon={<PlusIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-5" />}
				/>
			</div>
		</div>
	);
};

export default DesignItemFooter;
