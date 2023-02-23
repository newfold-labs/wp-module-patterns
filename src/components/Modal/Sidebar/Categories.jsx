/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useMemo } from '@wordpress/element';
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

	// Set global state when the categories are loading.
	useEffect(() => {
		setIsSidebarLoading(!data && isValidating);
	}, [data, isValidating, setIsSidebarLoading]);

	/**
	 * Set the active category.
	 *
	 * @param {string} category
	 */
	const setActiveCategory = (category) => {
		if (type === 'patterns') {
			setActivePatternsCategory(category);
		} else {
			setActiveTemplatesCategory(category);
		}
	};

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
							title: `favorite_${type}`,
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
							setActiveCategory(`favorite_${type}`);
						}}
					/>
				</ul>
			)}
		</>
	);
};
export default Categories;
