/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

const Spinner = ({ size = 60 }) => {
	return (
		<div
			className="nfd-wba-flex nfd-wba-shrink-0 nfd-wba-grow-0 nfd-wba-animate-spin nfd-wba-rounded-full nfd-wba-border-2 nfd-wba-border-solid nfd-wba-border-brand nfd-wba-border-r-brand/10 nfd-wba-align-[-0.125em]"
			style={{ width: `${size}px`, height: `${size}px` }}
			role="status"
		>
			<span className="nfd-wba-sr-only">{__("Loading…", "nfd-wonder-blocks")}</span>
		</div>
	);
};
export default Spinner;
