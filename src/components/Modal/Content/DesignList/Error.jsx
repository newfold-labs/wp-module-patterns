/**
 * WordPress dependencies
 */
import { createInterpolateElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { SUPPORT_URL } from "../../../../constants";
import { ReactComponent as ErrorSVG } from "../../../../svg/Error.svg";

const Error = () => {
	const message = createInterpolateElement(
		__(
			"Sorry! There was an error loading this page. If this issue persists, contact our <a>support team</a>."
		),
		{
			a: (
				<a href={SUPPORT_URL} target="_blank" rel="noreferrer">
					{__("support team", "nfd-wonder-blocks")}
				</a>
			),
		}
	);

	return (
		<div className="nfd-wba-flex nfd-wba-grow nfd-wba-items-center nfd-wba-justify-center">
			<div className="nfd-wba-state-message nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[640px] nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-8 nfd-wba-pb-[10%]">
				<ErrorSVG />
				<p className="nfd-wba-m-0 nfd-wba-text-center nfd-wba-text-2xl nfd-wba-font-light nfd-wba-text-dark">
					{message}
				</p>
			</div>
		</div>
	);
};
export default Error;
