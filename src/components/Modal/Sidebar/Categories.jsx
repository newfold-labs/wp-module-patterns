/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useCallback, useEffect, useMemo } from '@wordpress/element';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	DEFAULT_PATTERNS_CATEGORY,
	DEFAULT_TEMPLATES_CATEGORY,
	SITE_EDITOR_CATEGORIES,
} from '../../../constants';
import heart from '../../Icons/heart';
import useCategories from '../../../hooks/useCategories';
import useFavorites from '../../../hooks/useFavorites';
import { store as nfdPatternsStore } from '../../../store';
import ErrorLoading from './ErrorLoading';
import ListElement from './ListElement';
import Skeleton from './Skeleton';

const Categories = ({ isSiteEditor = false, type = 'patterns' }) => {
	// Fetch data.
	const { data, error, isValidating } = useCategories(type);
	const { data: favoritesData } = useFavorites();

	// Store actions and states.
	const {
		setIsSidebarLoading,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
	} = useDispatch(nfdPatternsStore);

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

	// Remove unnecessary categories - depending on current page.
	const filteredCategories = useMemo(() => {
		if (!isSiteEditor) {
			return data?.filter(
				(category) => !SITE_EDITOR_CATEGORIES.includes(category.title)
			);
		}

		return data;
	}, [isSiteEditor, data]);

	const favoritesCount = useMemo(() => {
		if (!favoritesData) {
			return 0;
		}
		return favoritesData?.filter((item) => item.type === type).length;
	}, [favoritesData, type]);

	return (
		<>
			{!data && isValidating && <Skeleton count={7} />}
			{!data && error && <ErrorLoading />}

			{data && (
				<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5">
					{filteredCategories?.map((category) => {
						return (
							<ListElement
								key={category.id}
								category={category}
								categoryType={type}
								onClick={() => {
									setActiveCategory(category?.title);
								}}
							/>
						);
					})}

					{/* Add Favorites list element. Depends on the type. */}

					<ListElement
						className="nfd-wba-border-0 nfd-wba-border-t nfd-wba-border-solid nfd-wba-border-grey-b"
						category={{
							id: `favorites`,
							label: __('Favorites', 'nfd-wonder-blocks'),
							title: 'favorites',
							count: favoritesCount,
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
						}}
					/>
				</ul>
			)}
		</>
	);
};

export default memo(Categories);
