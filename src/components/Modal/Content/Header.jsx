/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../store';

const Header = () => {
	return (
		<header className="nfd-wba-sticky nfd-wba-top-0 nfd-wba-flex nfd-wba-min-h-[68px] nfd-wba-items-center nfd-wba-justify-end nfd-wba-border-0 nfd-wba-border-b nfd-wba-border-solid nfd-wba-border-black/10 nfd-wba-py-4 nfd-wba-px-6">
			<Button
				className="nfd-wba-text-current hover:nfd-wba-text-dark"
				showTooltip={false}
				onClick={() => {
					dispatch(nfdPatternsStore).setIsModalOpen(false);
				}}
				icon={close}
				iconSize={24}
				label={__('Close', 'nfd-wonder-blocks')}
			/>
		</header>
	);
};
export default Header;
