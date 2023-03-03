/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useMemo, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { SITE_EDITOR_CATEGORIES } from '../../../constants';
import useCategories from '../../../hooks/useCategories';
import { store as nfdPatternsStore } from '../../../store';
import ErrorLoading from './ErrorLoading';
import ListElement from './ListElement';
import Skeleton from './Skeleton';

const Categories = ({ isSiteEditor, type = 'patterns' }) => {
	const { data, error, isValidating } = useCategories(type);

	const {
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setIsSidebarLoading,
	} = useDispatch(nfdPatternsStore);

	const { activePatternsCategory } = useSelect((select) => {
		return {
			activePatternsCategory:
				select(nfdPatternsStore).getActivePatternsCategory(),
		};
	}, []);

	// Set global state when the categories are loading.
	useEffect(() => {
		setIsSidebarLoading(!data && isValidating);
	}, [data, isValidating, setIsSidebarLoading]);

	/**
	 * Set the active category.
	 *
	 * @param {string} category
	 */
	const setActiveCategory = useCallback(
		(category) => {
			if (category === 'favorites') {
				setActivePatternsCategory(category);
				setActiveTemplatesCategory(category);
			} else if (type === 'patterns') {
				setActivePatternsCategory(category);
			} else {
				setActiveTemplatesCategory(category);
			}
		},
		[setActivePatternsCategory, setActiveTemplatesCategory, type]
	);

	// Filter the categories if we are not in the site editor.
	const filteredCategories = useMemo(() => {
		if (!isSiteEditor) {
			return data?.filter(
				(category) => !SITE_EDITOR_CATEGORIES.includes(category.title)
			);
		}

		return data;
	}, [isSiteEditor, data]);

	// Set the active category to the first when the categories are loaded.
	useEffect(() => {
		if (data && !activePatternsCategory) {
			setActiveCategory(data[0]?.title);
		}
	}, [activePatternsCategory, data, setActiveCategory]);

	return (
		<>
			{!data && isValidating && <Skeleton count={7} />}
			{!data && error && <ErrorLoading />}

			{data && (
				<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5">
					{filteredCategories.map((category) => {
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
						className="nfd-wba-mt-4"
						category={{
							id: `favorite-${type}`,
							label: __('Favorites', 'nfd-wonder-blocks'),
							title: 'favorites',
							count: 3, // todo fetch favorites count
						}}
						categoryType={type}
						icon={
							<Icon
								fill="currentColor"
								className="-nfd-wba-ml-1"
								icon={starEmpty}
							/>
						}
						onClick={() => {
							setActiveCategory('favorites');
						}}
					/>
				</ul>
			)}
		</>
	);
};
export default Categories;
