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

	// Check if category exists in the array.
	const isCategoryValid = useCallback(
		(category) => {
			if (category === 'favorites') {
				return true;
			}

			return data?.some((cat) => cat.title === category);
		},
		[data]
	);

	// Set sidebar loading state.
	useEffect(() => {
		setIsSidebarLoading(!data && isValidating);
	}, [data, isValidating, setIsSidebarLoading]);

	// Check if the active category is valid - set defaults if needed.
	useEffect(() => {
		const activeCat =
			type === 'patterns'
				? activePatternsCategory
				: activeTemplatesCategory;

		if (!isCategoryValid(activeCat)) {
			setActiveCategory(
				'patterns' === type
					? DEFAULT_PATTERNS_CATEGORY
					: DEFAULT_TEMPLATES_CATEGORY
			);
		}
	}, [
		activePatternsCategory,
		activeTemplatesCategory,
		isCategoryValid,
		setActiveCategory,
		type,
	]);

	// Remove unnecessary categories - depending on current page.
	const filteredCategories = useMemo(() => {
		// SWR returns an object with error data if there is an error.
		if (!data || !Array.isArray(data)) {
			return null;
		}

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
