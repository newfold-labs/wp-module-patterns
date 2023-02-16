/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ErrorLoading = () => {
	return <p>{__('Loading data…', 'nfd-wonder-blocks')}</p>;
};
export default ErrorLoading;
