/**
 * External dependencies
 */
import Logo from '../../Logo';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

function LoadingBar({ isComplete }) {
	if (isComplete) {
		return null;
	}

	return (
		<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pb-40">
			<Logo size="large" color="brand" />

			<h2 className="nfd-wba-m-0 nfd-wba-text-center nfd-wba-text-xl nfd-wba-font-light nfd-wba-text-dark-lighter">
				One moment while we load content tailored for your site.
			</h2>

			<div
				className="nfd-wba-inline-block nfd-wba-h-[60px] nfd-wba-w-[60px] nfd-wba-animate-spin nfd-wba-rounded-full nfd-wba-border-2 nfd-wba-border-solid nfd-wba-border-brand nfd-wba-border-r-brand/10 nfd-wba-align-[-0.125em]"
				role="status"
			>
				<span className="nfd-wba-sr-only">
					{__('Loading…', 'nfd-wonder-blocks')}
				</span>
			</div>
		</div>
	);
}
export default LoadingBar;
