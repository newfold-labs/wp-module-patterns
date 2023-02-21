/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { buttons, Icon } from '@wordpress/icons';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../store';

const ToolbarButton = () => {
	const { isModalOpen } = useSelect((select) => ({
		isModalOpen: select(nfdPatternsStore).isModalOpen(),
	}));

	const { setIsModalOpen } = useDispatch(nfdPatternsStore);

	return (
		<>
			<Button
				icon={<Icon icon={buttons} />}
				text={__('Wonder Blocks', 'nfd-wonder-blocks')}
				className={classNames(
					'nfd-wba-ml-2 nfd-wba-flex nfd-wba-h-9 nfd-wba-shrink-0 nfd-wba-gap-1 nfd-wba-bg-brand nfd-wba-text-white hover:nfd-wba-bg-brand-darker hover:nfd-wba-text-white focus-visible:nfd-wba-text-white active:!nfd-wba-text-white',
					isModalOpen && '!nfd-wba-bg-dark'
				)}
				onClick={() => setIsModalOpen(true)}
			/>
		</>
	);
};

export default ToolbarButton;
