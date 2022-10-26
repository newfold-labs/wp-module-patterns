/**
 * Internal dependencies
 */
import { dispatch } from '../../helpers/events';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { Button } from '@wordpress/components';

const ContentHeader = () => {
	return (
		<header className="nfd-mb-2 nfd-flex nfd-h-[60px] nfd-items-center nfd-justify-between nfd-border-0 nfd-border-b nfd-border-solid nfd-border-gray-200/75 nfd-px-6">
			<h2 className="nfd-text-base nfd-font-medium">
				<span>All Patterns </span>
				<span className="nfd-font-normal nfd-text-gray-500">(352)</span>
			</h2>

			<div>
				<Button
					showTooltip={false}
					onClick={() => {
						dispatch('nfd/cloudPatterns/closeLibrary');
					}}
					icon={closeSmall}
					label={__('Close dialog', 'nfd-patterns')}
				/>
			</div>
		</header>
	);
};

export default ContentHeader;
