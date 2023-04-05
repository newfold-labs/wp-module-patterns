/**
 * Internal dependencies
 */
import { fetcher } from '../helpers/fetcher';
import { NFD_REST_URL } from '../constants';

/**
 * External dependencies
 */
import useSWR from 'swr';

const useCategories = (type = 'patterns') => {
	const endpoint = type === 'patterns' ? 'categories' : 'templateCategories';

	const { data, error, isValidating } = useSWR(
		{
			url: `${NFD_REST_URL}/${endpoint}`,
		},
		fetcher
	);

	if (!Array.isArray(data)) {
		return {
			data: null,
			isError: error,
			isValidating,
		};
	}

	return {
		data,
		isError: error,
		isValidating,
	};
};

export default useCategories;
