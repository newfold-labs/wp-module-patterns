/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../../store';
import KeywordFilter from './KeywordFilter';
import TrialNotice from './TrialNotice';

const Header = () => {
	const showTrial = true;

	return (
		<header className="nfd-wba-modal__header">
			<KeywordFilter />

			<div className="nfd-items-center nfd-wba-ml-auto nfd-wba-flex nfd-wba-gap-x-4">
				{showTrial && <TrialNotice />}
				<Button
					className="nfd-wba-ml-auto nfd-wba-text-current hover:nfd-wba-text-dark"
					showTooltip={false}
					onClick={() => {
						dispatch(nfdPatternsStore).setIsModalOpen(false);
					}}
					icon={closeSmall}
					iconSize={24}
					label={__('Close', 'nfd-wonder-blocks')}
				/>
			</div>
		</header>
	);
};
export default Header;
