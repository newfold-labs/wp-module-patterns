import { Button } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Icon, symbol } from '@wordpress/icons';

import { store as nfdPatternsStore } from '../store';

const ToolbarButton = () => {
	return (
		<>
			<Button
				icon={<Icon icon={symbol} />}
				text={__('Cloud Patterns', 'nfd-patterns')}
				className="nfd-ml-2 nfd-flex nfd-h-9 nfd-shrink-0 nfd-gap-1 nfd-bg-gray-100"
				onClick={() => dispatch(nfdPatternsStore).setIsModalOpen(true)}
			/>
		</>
	);
};

export default ToolbarButton;
