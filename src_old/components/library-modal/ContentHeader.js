/**
 * Internal dependencies
 */
import { dispatch } from '../../helpers/events';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
import { LibraryModalContext } from '../../context/library-modal-context';

const ContentHeader = () => {
	const { searchValue } = useContext(LibraryModalContext);
	return (
		<header className="nfd-gray-50 nfd-sticky nfd-top-0 nfd-z-10 nfd-flex nfd-h-[60px] nfd-shrink-0 nfd-items-center nfd-justify-between nfd-px-6">
			{searchValue && (
				<h2 className="nfd-text-sm">
					12 results found for <em>“{searchValue}”</em>
				</h2>
			)}
			<Button
				showTooltip={false}
				className="nfd-ml-auto"
				onClick={() => {
					dispatch('nfd/cloudPatterns/closeLibrary');
				}}
				icon={closeSmall}
				label={__('Close dialog', 'nfd-patterns')}
			/>
		</header>
	);
};

export default ContentHeader;
