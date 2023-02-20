/**
 * WordPress dependencies
 */

import { useEffect, useRef } from '@wordpress/element';

/**
 * External dependencies
 */
import { useNProgress } from '@tanem/react-nprogress';
import Logo from '../../Logo';

function LoadingBar({ isComplete }) {
	const { isFinished, progress } = useNProgress({
		isAnimating: !isComplete,
		incrementDuration: 300,
	});

	const barRef = useRef(null);

	useEffect(() => {
		if (barRef.current) {
			barRef.current.style.setProperty(
				'--nfd-wba-loading-progress',
				progress
			);
		}
	}, [progress]);

	if (isFinished) {
		return null;
	}

	return (
		<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pb-40">
			<Logo size="large" color="brand" />

			<div
				ref={barRef}
				className="nfd-wba-loading-bar nfd-wba-relative nfd-wba-h-2 nfd-wba-w-full nfd-wba-max-w-[360px] nfd-wba-overflow-hidden nfd-wba-rounded-full"
			/>

			<h2 className="nfd-wba-m-0 nfd-wba-mt-2 nfd-wba-text-center nfd-wba-text-xl nfd-wba-font-light nfd-wba-text-dark-lighter">
				One moment while we load content tailored for your site.
			</h2>
		</div>
	);
}
export default LoadingBar;
