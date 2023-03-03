/**
 * Internal dependencies
 */
import { REST_URL } from '../constants';
import { fetcher } from '../helpers/fetcher';

/**
 * External dependencies
 */
import useSWR from 'swr';

const useFavorites = () => {
	const { data, error, isValidating, mutate } = useSWR(
		{
			url: `${REST_URL}/favorites`,
		},
		fetcher
	);

	return {
		data,
		isError: error,
		isValidating,
		mutate,
	};
};

export default useFavorites;
