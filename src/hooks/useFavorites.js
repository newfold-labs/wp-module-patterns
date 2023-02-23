/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { REST_URL } from '../constants';
import { fetcher } from '../helpers/fetcher';

/**
 * External dependencies
 */
import useSWR from 'swr';

const useFavorites = (type = 'patterns') => {
	const endpoint = type === 'patterns' ? 'patterns' : 'templates';

	const { data, error, isValidating, mutate } = useSWR(
		{
			url: `${REST_URL}/favorites/${endpoint}`,
			method: 'GET',
			headers: {
				'x-nfd-wonder-blocks': 'nfd_wonder_blocks',
			},
		},
		fetcher
	);

	useEffect(() => {
		console.log({ favData: data });
	}, [data]);

	return {
		data,
		isError: error,
		isValidating,
		mutate,
	};
};

export default useFavorites;
