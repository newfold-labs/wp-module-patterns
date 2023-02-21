import apiFetch from '@wordpress/api-fetch';

/**
 * Fetcher function for SWR.
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */
export const fetcher = (...args) => apiFetch(...args).then((res) => res);
