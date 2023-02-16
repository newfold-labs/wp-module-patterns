/**
 * Internal dependencies
 */
import { fetcher } from '../helpers/fetcher';

/**
 * External dependencies
 */
import useSWR from 'swr';

const useFetchPatterns = () => {
	const { data, error } = useSWR(
		{
			url: `${window.nfdCloudPatterns.baseUrl}/patterns`,
			method: 'GET',
		},
		fetcher
	);

	return {
		data,
		isError: error,
		isLoading: !error && !data,
	};
};

export default useFetchPatterns;
