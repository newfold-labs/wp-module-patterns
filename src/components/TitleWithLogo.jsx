/**
 * WordPress dependencies
 */
import { Icon } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import { rectangleGroup } from "./Icons";

const TitleWithLogo = ({ title }) => (
	<div className="nfd-wba-relative nfd-wba-w-full nfd-wba-pr-9 nfd-wba-flex nfd-wba-items-center">
		<div className="nfd-wba-flex-1">{title}</div>
		<div className="nfd-wba-bg-brand nfd-wba-rounded-full nfd-wba-flex nfd-wba-justify-center nfd-wba-items-center nfd-wba-w-7 nfd-wba-h-7 nfd-wba-absolute nfd-wba-right-0">
			<Icon icon={rectangleGroup} className="!nfd-wba-fill-none nfd-wba-stroke-white" size={16} />
		</div>
	</div>
);

export default TitleWithLogo;
