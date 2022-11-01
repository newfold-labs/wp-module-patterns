/**
 * WordPress dependencies.
 */
import apiFetch from '@wordpress/api-fetch';

// WP Nonce Middleware.
apiFetch.use(apiFetch.createNonceMiddleware(window.nfdCloudPatterns.nonce));

/**
 * API Fetcher.
 *
 * @param {...any} args apiFetch supports and passes through all options of the fetch global.
 * @return {Promise} Promise resolving to the response.
 */
export const fetcher = (...args) => apiFetch(...args).then((res) => res);
