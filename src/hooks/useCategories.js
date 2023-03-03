/**
 * Internal dependencies
 */
import { fetcher } from '../helpers/fetcher';
import { REST_URL } from '../constants';

/**
 * External dependencies
 */
import useSWR from 'swr';

const useCategories = (type = 'patterns') => {
	const endpoint = type === 'patterns' ? 'categories' : 'templateCategories';

	const { data, error, isValidating } = useSWR(
		{
			url: `${REST_URL}/${endpoint}`,
		},
		fetcher
	);

	return {
		data,
		isError: error,
		isValidating,
	};
};

export default useCategories;
