/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ErrorLoading = () => {
	return <p>{__('Loading data…', 'nfd-cloud-patterns')}</p>;
};
export default ErrorLoading;
