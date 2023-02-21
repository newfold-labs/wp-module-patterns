/**
 * Internal dependencies
 */
import { fetcher } from '../helpers/fetcher';
import { REST_URL } from '../constants';

/**
 * External dependencies
 */
import useSWR from 'swr';

const usePatterns = () => {
	const { data, error, isValidating } = useSWR(
		{
			url: `${REST_URL}/patterns`,
			method: 'GET',
			headers: {
				'x-nfd-wonder-blocks': 'nfd_wonder_blocks',
			},
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
