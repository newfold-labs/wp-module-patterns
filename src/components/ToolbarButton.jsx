/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { ToolbarButton as WPToolbarButton } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { Icon, buttons } from '@wordpress/icons';

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
		<WPToolbarButton
			icon={<Icon icon={buttons} />}
			text="Wonder Blocks"
			className={classNames(
				'nfd-wba-ml-2 nfd-wba-flex !nfd-wba-h-9 nfd-wba-shrink-0 nfd-wba-bg-brand nfd-wba-text-white hover:nfd-wba-bg-brand-darker hover:nfd-wba-text-white focus-visible:nfd-wba-text-white active:nfd-wba-bg-brand-darker-10 active:!nfd-wba-text-white',
				isModalOpen && '!nfd-wba-bg-dark nfd-wba-text-white'
			)}
			isPressed={isModalOpen}
			onClick={() => setIsModalOpen(true)}
		/>
	);
};

export default ToolbarButton;
