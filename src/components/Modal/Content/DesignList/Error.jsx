/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ReactComponent as ErrorSVG } from '../../../../svg/Error.svg';

const Error = () => {
	return (
		<div className="nfd-wba-flex nfd-wba-grow nfd-wba-items-center nfd-wba-justify-center">
			<div className="nfd-wba-w-[640px] nfd-wba-gap-8 nfd-wba-pb-[10%]">
				<ErrorSVG />
				<p className="nfd-wba-text-center nfd-wba-text-2xl nfd-wba-font-light nfd-wba-text-dark">
					{__(
						'Sorry! There was an error loading this page. If this issue persists, contact our support team.',
						'nfd-wonder-blocks'
					)}
				</p>
			</div>
		</div>
	);
};
export default Error;
