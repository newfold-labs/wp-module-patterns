/**
 * WordPress dependencies
 */
import { Icon } from "@wordpress/icons";
import { rectangleGroup } from "./Icons";

/**
 * External dependencies
 */
import classNames from "classnames";
import { BRAND_NAME } from "../constants";

const Logo = ({ size = "regular", color = "dark" }) => {
	return (
		<div className="nfd-wba-m-0 -nfd-wba-ml-1 nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-lg nfd-wba-font-normal nfd-wba-text-dark">
			<Icon
				className={classNames(color === "brand" && "nfd-wba-stroke-brand")}
				size={size === "large" ? 40 : 24}
				icon={rectangleGroup}
			/>

			<span
				className={classNames(
					"nfd-wba-select-none",
					size === "large" && "nfd-wba-text-3xl",
					color === "brand" && "nfd-wba-text-brand"
				)}
			>
				{BRAND_NAME}
			</span>
		</div>
	);
};
export default Logo;
