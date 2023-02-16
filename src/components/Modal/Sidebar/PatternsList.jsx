/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { NFD_REST_BASE } from '../../../constants';
import ErrorLoading from '../../ErrorLoading';
import Loading from '../../Loading';

/**
 * External dependencies
 */
import useSWR from 'swr';
import ListItem from './ListItem';

/**
 * Fetcher function for useSWR
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */
const fetcher = (...args) => apiFetch(...args).then((res) => res);

const PatternsList = () => {
	const { data, error, isValidating } = useSWR(
		{
			url: `${NFD_REST_BASE}/categories`,
			method: 'GET',
		},
		fetcher
	);
	return (
		<>
			{!data && isValidating && <Loading />}
			{!data && error && <ErrorLoading />}

			{data && (
				<ul className="nfd-flex nfd-list-none nfd-flex-col">
					{data.map((category) => {
						return (
							<ListItem
								key={category.id}
								category={category}
								onClick={() => {
									alert('click!');
								}}
							/>
						);
					})}
				</ul>
			)}

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
};
export default PatternsList;
