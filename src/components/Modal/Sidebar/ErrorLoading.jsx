/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

const ErrorLoading = () => {
	return (
		<p className="nfd-wba-m-0 nfd-wba-px-6 nfd-wba-pt-[5vh] nfd-wba-text-center">
			{__("Failed to load data.", "nfd-wonder-blocks")}
		</p>
	);
};
export default ErrorLoading;
