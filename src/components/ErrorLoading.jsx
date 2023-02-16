/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ErrorLoading = () => {
	return <p>{__('Failed to load data.', 'nfd-cloud-patterns')}</p>;
};
export default ErrorLoading;
