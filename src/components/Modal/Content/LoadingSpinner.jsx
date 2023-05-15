/**
 * Internal dependencies
 */
import Logo from '../../Logo';
import Spinner from './Spinner';

function LoadingSpinner({ isComplete }) {
	if (isComplete) {
		return null;
	}

	return (
		<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pb-40">
			<Logo size="large" color="brand" />

			<h2 className="nfd-wba-m-0 nfd-wba-text-center nfd-wba-text-xl nfd-wba-font-light nfd-wba-text-dark-lighter">
				One moment while we load content tailored for your site.
			</h2>

			<Spinner />
		</div>
	);
}
export default LoadingSpinner;
