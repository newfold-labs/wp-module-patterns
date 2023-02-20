/**
 * Internal dependencies
 */
import { fetcher } from '../helpers/fetcher';
import { REST_URL, DEFAULT_PATTERNS_CATEGORY } from '../constants';

/**
 * External dependencies
 */
import useSWR from 'swr';

const usePatterns = (category = DEFAULT_PATTERNS_CATEGORY) => {
	const { data, error, isValidating } = useSWR(
		{
			url: `${REST_URL}/patterns`,
			method: 'GET',
		},
		fetcher
	);

	return {
		data,
		isError: error,
		isValidating,
	};
};

export default usePatterns;
