/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Logo from "../../Logo";
import Spinner from "./Spinner";

function LoadingSpinner({ isComplete }) {
	if (isComplete) {
		return null;
	}

	return (
		<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-start nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pt-10 sm:nfd-wba-justify-center sm:nfd-wba-pb-40 sm:nfd-wba-pt-0">
			<Logo size="large" color="brand" />

			<h2 className="nfd-wba-m-0 nfd-wba-mb-3 nfd-wba-max-w-[300px] nfd-wba-text-center nfd-wba-text-xl nfd-wba-font-light nfd-wba-text-balance nfd-wba-text-dark-lighter sm:nfd-wba-max-w-full">
				{__("One moment while we load content tailored for your site.", "nfd-wonder-blocks")}
			</h2>

			<Spinner />
		</div>
	);
}
export default LoadingSpinner;
