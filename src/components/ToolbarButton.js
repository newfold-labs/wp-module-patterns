/**
 * Internal dependencies
 */
import { dispatch } from '../helpers/events';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, symbol } from '@wordpress/icons';
import { Button } from '@wordpress/components';

const ToolbarButton = () => {
	return (
		<>
			<Button
				icon={<Icon icon={symbol} />}
				text={__('Cloud Patterns', 'nfd-patterns')}
				className="nfd-ml-2 nfd-flex nfd-h-9 nfd-gap-1 nfd-bg-gray-100"
				onClick={() => {
					dispatch('nfd/cloudPatterns/openLibrary', true);
				}}
			/>
		</>
	);
};

export default ToolbarButton;
