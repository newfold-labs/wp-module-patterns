/**
 * Internal dependencies
 */
import LibraryModal from './library-modal';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, symbol } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const ToolbarButton = () => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Button
				icon={<Icon icon={symbol} />}
				text={__('Cloud Patterns', 'nfd-patterns')}
				className="nfd-ml-2 nfd-flex nfd-h-9 nfd-gap-1 nfd-bg-gray-100"
				isPressed={modalOpen}
				onClick={() => {
					setModalOpen((prevState) => !prevState);
				}}
			/>

			{modalOpen && <LibraryModal onClose={() => setModalOpen(false)} />}
		</>
	);
};

export default ToolbarButton;
