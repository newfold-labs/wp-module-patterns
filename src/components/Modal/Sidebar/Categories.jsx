/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import useCategories from '../../../hooks/useCategories';
import usePatterns from '../../../hooks/usePatterns';
import { store as nfdPatternsStore } from '../../../store';
import { heart } from '../../Icons';
import ErrorLoading from './ErrorLoading';
import ListElement from './ListElement';
import Skeleton from './Skeleton';

const Categories = ({ type = 'patterns' }) => {
	// Fetch data.
	const { data, error, isValidating } = useCategories(type);
	const { data: favoritesData } = usePatterns(true);

	// Store actions and states.
	const {
		setIsSidebarLoading,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setShouldResetKeywords,
	} = useDispatch(nfdPatternsStore);

	const { keywordsFilter } = useSelect((select) => ({
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	// Set the active category.
	const setActiveCategory = useCallback(
		(category) => {
			if (type === 'patterns') {
				setActivePatternsCategory(category);
			} else {
				setActiveTemplatesCategory(category);
			}
		},
		[setActivePatternsCategory, setActiveTemplatesCategory, type]
	);

	// Set sidebar loading state.
	useEffect(() => {
		setIsSidebarLoading(!data && isValidating);
	}, [data, isValidating, setIsSidebarLoading]);

	return (
		<>
			{!data && isValidating && <Skeleton count={14} />}
			{!data && error && <ErrorLoading />}

			{data && (
				<ul
					className={classNames(
						'nfd-wba-list-elements nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5',
						!!keywordsFilter && 'nfd-wba-list-elements--is-filtered'
					)}
				>
					{data?.map((category) => {
						return (
							<ListElement
								key={category.id}
								category={category}
								categoryType={type}
								onClick={() => {
									setActiveCategory(category?.title);
									setShouldResetKeywords(true);
								}}
							/>
						);
					})}

					{/* Add Favorites list element. */}
					<ListElement
						className="nfd-wba-list-element--favorites nfd-wba-mt-2 nfd-wba-border-0"
						category={{
							id: `favorites`,
							label: __('Favorites', 'nfd-wonder-blocks'),
							title: 'favorites',
							count: favoritesData?.length,
						}}
						categoryType={type}
						icon={
							<Icon
								fill="currentColor"
								className="-nfd-wba-ml-1 nfd-wba-fill-red-600"
								icon={heart}
								size={16}
							/>
						}
						onClick={() => {
							setActivePatternsCategory('favorites');
							setActiveTemplatesCategory('favorites');
							setShouldResetKeywords(true);
						}}
					/>
				</ul>
			)}
		</>
	);
};

export default memo(Categories);
