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
		<header className="nfd-sticky nfd-flex nfd-min-h-[68px] nfd-items-center nfd-justify-end nfd-border-0 nfd-border-b nfd-border-solid nfd-border-black/10 nfd-py-4 nfd-px-6">
			<Button
				showTooltip={false}
				onClick={() => {
					dispatch(nfdPatternsStore).setIsModalOpen(false);
				}}
				icon={close}
				label={__('Close', 'nfd-patterns')}
			/>
		</header>
	);
};
export default Header;
