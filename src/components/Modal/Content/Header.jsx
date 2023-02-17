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
		<header className="nfd-wba-modal__header nfd-wba-justify-end">
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
