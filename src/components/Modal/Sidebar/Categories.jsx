/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, starFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { SITE_EDITOR_CATEGORIES } from '../../../constants';
import { store as nfdPatternsStore } from '../../../store';
import ErrorLoading from './ErrorLoading';

/**
 * External dependencies
 */
import ListElement from './ListElement';
import Skeleton from './Skeleton';
import useCategories from '../../../hooks/useCategories';

const Categories = ({ isSiteEditor, type = 'patterns' }) => {
	const { data, error, isValidating } = useCategories(type);
	const { setActivePatternsCategory, setActiveTemplatesCategory } =
		useDispatch(nfdPatternsStore);

	// useEffect(() => {
	// 	// ako nema selected, podesi DEFAULT iz constants
	// }, []);

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
				<>
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
					</ul>

					<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-border-0 nfd-wba-border-t nfd-wba-border-solid nfd-wba-border-grey-b nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5">
						{type === 'patterns' && (
							<ListElement
								category={{
									id: 'favorite-patterns',
									label: __('Favorites', 'nfd-wonder-blocks'),
									title: 'favorite_patterns',
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
									setActiveCategory('favorite_patterns');
								}}
							/>
						)}

						{type === 'templates' && (
							<ListElement
								category={{
									id: 'favorite-templates',
									label: __('Favorites', 'nfd-wonder-blocks'),
									title: 'favorite_templates',
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
									setActiveCategory('favorite_templates');
								}}
							/>
						)}
					</ul>
				</>
			)}
		</>
	);
};
export default Categories;
