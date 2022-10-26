import { __ } from '@wordpress/i18n';
import { Icon, symbol } from '@wordpress/icons';

const SidebarHeader = () => {
	return (
		<div className="nfd-flex nfd-h-[60px] nfd-items-center nfd-gap-2 nfd-border-0 nfd-border-b nfd-border-solid nfd-border-gray-200/75 nfd-px-6">
			<Icon size={24} icon={symbol} />
			<h1 className="nfd-text-base nfd-font-medium">
				{__('Cloud Patterns Library', 'cloud-patterns')}
			</h1>
		</div>
	);
};

export default SidebarHeader;
