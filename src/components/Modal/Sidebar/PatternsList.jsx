/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { Icon, starFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { REST_URL, SITE_EDITOR_CATEGORIES } from '../../../constants';
import { store as nfdPatternsStore } from '../../../store';
import ErrorLoading from '../Sidebar/ErrorLoading';

/**
 * External dependencies
 */
import useSWR from 'swr';
import ListElement from './ListElement';
import Skeleton from './Skeleton';

/**
 * Fetcher function for useSWR.
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */
const fetcher = (...args) => apiFetch(...args).then((res) => res);

const PatternsList = ({ isSiteEditor }) => {
	const { data, error, isValidating } = useSWR(
		{
			url: `${REST_URL}/categories`,
			method: 'GET',
		},
		fetcher
	);

	const { setActivePatternCategory } = useDispatch(nfdPatternsStore);

	// Filter the categories if we are not in the site editor.
	const filteredCategories = useMemo(() => {
		if (!isSiteEditor) {
			return data?.filter(
				(category) => !SITE_EDITOR_CATEGORIES.includes(category.title)
			);
		}

		return data;
	}, [isSiteEditor, data]);

	return (
		<>
			{!data && isValidating && <Skeleton count={7} />}
			{!data && error && <ErrorLoading />}

			{data && (
				<>
					<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5">
						{filteredCategories.map((category) => {
							return (
								<ListElement
									key={category.id}
									category={category}
									onClick={() => {
										setActivePatternCategory(
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
								count: 3,
							}}
							icon={
								<Icon
									fill="currentColor"
									className="-nfd-wba-ml-1"
									icon={starFilled}
								/>
							}
							onClick={() => {
								setActivePatternCategory('favorites');
							}}
						/>
					</ul>
				</>
			)}
		</>
	);
};
export default PatternsList;
