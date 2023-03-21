/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useCallback, useEffect, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	DEFAULT_PATTERNS_CATEGORY,
	DEFAULT_TEMPLATES_CATEGORY,
	SITE_EDITOR_CATEGORIES,
} from '../../../constants';
import useCategories from '../../../hooks/useCategories';
import { store as nfdPatternsStore } from '../../../store';
import ErrorLoading from './ErrorLoading';
import ListElement from './ListElement';
import Skeleton from './Skeleton';

const Categories = ({ isSiteEditor = false, type = 'patterns' }) => {
	// Fetch data.
	const { data, error, isValidating } = useCategories(type);

	// Store actions and states.
	const {
		setIsSidebarLoading,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
	} = useDispatch(nfdPatternsStore);

	const { activePatternsCategory, activeTemplatesCategory } = useSelect(
		(select) => {
			return {
				activePatternsCategory:
					select(nfdPatternsStore).getActivePatternsCategory(),
				activeTemplatesCategory:
					select(nfdPatternsStore).getActiveTemplatesCategory(),
			};
		}
	);

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
				</ul>
			)}
		</>
	);
};

export default memo(Categories);
