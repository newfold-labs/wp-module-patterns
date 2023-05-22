/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useCallback, useEffect, useMemo } from '@wordpress/element';
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
	const { data: allFavs } = usePatterns({ onlyFavorites: true, perPage: -1 });

	// Format categories for mobile dropdown
	const formattedCategoriesForMobile = useMemo(
		() =>
			data
				?.reduce(
					(result, category) => {
						return [
							...result,
							{
								label:
									category.label +
									' (' +
									category.count +
									')',
								value: category.title,
							},
						];
					},
					[
						{
							value: 'favorites',
							label:
								__('Favorites', 'nfd-wonder-blocks') +
								' (' +
								(allFavs?.length ?? 0) +
								')',
						},
					]
				)
				.sort((a, b) => {
					if (a.value === 'favorites') {
						return 1; // Move 'favorites' to the end
					} else if (b.value === 'favorites') {
						return -1; // Keep 'favorites' at the end
					}
					return 0; // Maintain the original order
				}),
		[data, allFavs]
	);

	// Store actions and states.
	const {
		setIsSidebarLoading,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setShouldResetKeywords,
	} = useDispatch(nfdPatternsStore);

	const { activePatternsCategory, activeTemplatesCategory, keywordsFilter } =
		useSelect((select) => ({
			activePatternsCategory:
				select(nfdPatternsStore).getActivePatternsCategory(),
			activeTemplatesCategory:
				select(nfdPatternsStore).getActiveTemplatesCategory(),
			keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
		}));

	// Set sidebar loading state.
	useEffect(() => {
		setIsSidebarLoading(!data && isValidating);
	}, [data, isValidating, setIsSidebarLoading]);

	/**
	 * Set active category depending if Pattern or Category.
	 *
	 * @param {string} category Category title.
	 * @return {void}
	 */
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

	/**
	 * Handle category change.
	 *
	 * @param {string} categoryTitle Category title.
	 * @return {void}
	 */
	const handleCategoryChange = useCallback(
		(categoryTitle) => {
			setActiveCategory(categoryTitle);
			setShouldResetKeywords(true);
		},
		[setActiveCategory, setShouldResetKeywords]
	);

	/**
	 * Get active category.
	 *
	 * @return {string} Active category.
	 */
	const getActiveCategory = useCallback(() => {
		if (type === 'patterns') {
			return activePatternsCategory;
		}

		return activeTemplatesCategory;
	}, [activePatternsCategory, activeTemplatesCategory, type]);

	return (
		<>
			{!data && isValidating && <Skeleton count={14} />}
			{!data && error && <ErrorLoading />}

			{data && (
				<>
					<SelectControl
						className="nfd-wba-modal__categories-select nfd-wba-mt-8 nfd-wba-h-12 nfd-wba-font-medium sm:!nfd-wba-hidden"
						aria-label={__(
							'Select a category',
							'nfd-wonder-blocks'
						)}
						value={getActiveCategory()}
						options={formattedCategoriesForMobile}
						onChange={(categoryTitle) =>
							handleCategoryChange(categoryTitle)
						}
						__nextHasNoMarginBottom
					/>

					<ul className="nfd-wba-list-elements nfd-wba-m-0 nfd-wba-list-none nfd-wba-flex-col nfd-wba-px-0 nfd-wba-py-4 nfd-wba-text-md nfd-wba-leading-5 sm:nfd-wba-flex">
						{data?.map((category) => {
							return (
								<ListElement
									key={category.id}
									category={category}
									isActive={
										!keywordsFilter &&
										category?.title === getActiveCategory()
									}
									onClick={() => {
										handleCategoryChange(category?.title);
									}}
								/>
							);
						})}

						{/* Add Favorites list element. */}
						<ListElement
							className="nfd-wba-list-element--favorites nfd-wba-mt-2 nfd-wba-border-0"
							category={{
								id: 'favorites',
								label: __('Favorites', 'nfd-wonder-blocks'),
								title: 'favorites',
								count: allFavs?.length,
							}}
							isActive={
								!keywordsFilter &&
								getActiveCategory() === 'favorites'
							}
							icon={
								<Icon
									fill="currentColor"
									className="-nfd-wba-ml-1 nfd-wba-fill-red-600"
									icon={heart}
									size={16}
								/>
							}
							onClick={() => {
								handleCategoryChange('favorites');
							}}
						/>
					</ul>
				</>
			)}
		</>
	);
};

export default memo(Categories);
