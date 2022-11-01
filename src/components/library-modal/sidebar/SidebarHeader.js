/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, symbol } from '@wordpress/icons';

const SidebarHeader = () => {
	return (
		<div className="nfd-sticky nfd-top-0 nfd-z-10 nfd-flex nfd-h-[60px] nfd-shrink-0 nfd-items-center nfd-gap-2 nfd-border-0 nfd-border-b nfd-border-solid nfd-border-gray-200/75 nfd-bg-white nfd-px-6">
			<Icon size={24} icon={symbol} />
			<h1 className="nfd-text-base nfd-font-medium">
				{__('Cloud Patterns Library', 'nfd-patterns')}
			</h1>
		</div>
	);
};

export default SidebarHeader;
