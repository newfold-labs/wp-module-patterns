/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { NFD_WONDER_BLOCKS_REST_URL } from '../../../constants';
import ErrorLoading from '../../ErrorLoading';
import Loading from '../../Loading';
import { store as nfdPatternsStore } from '../../../store';

/**
 * External dependencies
 */
import useSWR from 'swr';
import ListElement from './ListElement';

/**
 * Fetcher function for useSWR.
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */
const fetcher = (...args) => apiFetch(...args).then((res) => res);

const PatternsList = () => {
	const { data, error, isValidating } = useSWR(
		{
			url: `${NFD_WONDER_BLOCKS_REST_URL}/categories`,
			method: 'GET',
			headers: {
				'x-nfd-wonder-blocks': 'nfd_wonder_blocks',
			},
		},
		fetcher
	);

	return (
		<>
			{!data && isValidating && <Loading />}
			{!data && error && <ErrorLoading />}

			{data && (
				<>
					<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5">
						{data.map((category) => {
							return (
								<ListElement
									key={category.id}
									category={category}
									onClick={() => {
										dispatch(
											nfdPatternsStore
										).setActivePatternCategory(
											category?.title
										);
									}}
								/>
							);
						})}
					</ul>

					<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-border-0 nfd-wba-border-t nfd-wba-border-solid nfd-wba-border-grey-b nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5">
						<ListElement
							category={{
								id: 'favorite-patterns',
								label: 'Favorites',
								title: 'favorites',
								// count: 3,
							}}
							onClick={() => {
								dispatch(
									nfdPatternsStore
								).setActivePatternCategory('favorites');
							}}
						/>
					</ul>
				</>
			)}
		</>
	);
};
export default PatternsList;
