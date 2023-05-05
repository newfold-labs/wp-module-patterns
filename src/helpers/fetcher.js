import apiFetch from '@wordpress/api-fetch';

/**
 * Fetcher function for SWR.
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */

export const fetcher = async ({ ...args }) => {
	const defaultOptions = {
		method: 'GET',
		headers: {
			'x-nfd-wonder-blocks': 'nfd_wonder_blocks',
		},
	};

	const mergedOptions = { ...defaultOptions, ...args };

	const res = await apiFetch(mergedOptions);
	return res;
};
