/**
 * External dependencies
 */
import clsx from "clsx";
import { Check, X } from "lucide-react";

/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const Spinner = ({ size = 60, className = "", state = "loading" }) => {
	const isLoading = state === "loading";
	const isError = state === "error";
	const isSuccess = state === "success";
	const prevStateRef = useRef(state);
	const [shouldAnimate, setShouldAnimate] = useState(false);

	useEffect(() => {
		// Check if state has changed
		if (prevStateRef.current !== state) {
			setShouldAnimate(true);
			prevStateRef.current = state;

			// Remove animation class after animation completes
			const timer = setTimeout(() => {
				setShouldAnimate(false);
			}, 300); // Match the animation duration

			return () => clearTimeout(timer);
		}
	}, [state]);

	const getScreenReaderText = () => {
		if (isError) return __("Error", "nfd-wonder-blocks");
		if (isSuccess) return __("Success", "nfd-wonder-blocks");
		return __("Loading…", "nfd-wonder-blocks");
	};

	const iconSize = 24;

	return (
		<div
			className={clsx(
				"nfd-wba-flex nfd-wba-shrink-0 nfd-wba-grow-0 nfd-wba-rounded-full nfd-wba-border-2 nfd-wba-border-solid nfd-wba-align-[-0.125em] nfd-wba-items-center nfd-wba-justify-center nfd-wba-transition-all nfd-wba-duration-300",
				{
					"nfd-wba-animate-spin nfd-wba-border-brand nfd-wba-border-r-brand/10": isLoading,
					"nfd-wba-border-red-500": isError,
					"nfd-wba-border-brand": isSuccess,
					"nfd-wba-animate-pop": shouldAnimate,
				},
				className
			)}
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
			role="status"
		>
			<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-justify-center">
				{isError && <X size={iconSize} className="nfd-wba-text-red-600" />}
				{isSuccess && <Check size={iconSize} className="nfd-wba-text-brand" />}
				<span className="nfd-wba-sr-only">{getScreenReaderText()}</span>
			</div>
		</div>
	);
};

export default Spinner;
