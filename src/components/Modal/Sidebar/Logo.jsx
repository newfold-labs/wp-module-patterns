/**
 * WordPress dependencies
 */
import { Icon, buttons } from '@wordpress/icons';

const Logo = () => {
	return (
		<div className="nfd-wba-modal__header nfd-wba-justify-start">
			<h1 className="nfd-wba-m-0 -nfd-wba-ml-1 nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-xl nfd-wba-font-normal nfd-wba-text-dark">
				<Icon icon={buttons} />
				<span className="nfd-wba-select-none">Wonder Blocks</span>
			</h1>
		</div>
	);
};
export default Logo;
