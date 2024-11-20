/**
 * WordPress dependencies
 */
import {
	SelectControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { memo, useCallback, useEffect, useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import { SITE_EDITOR_CATEGORIES } from "../../../constants";
import { useCategories, usePatterns } from "../../../hooks";
import { store as nfdPatternsStore } from "../../../store";

import iconMapping from "../../../helpers/iconMapping";
import useSetCurrentView from "../../../hooks/useSetCurrentView";
import ErrorLoading from "./ErrorLoading";
import ListElement from "./ListElement";
import Skeleton from "./Skeleton";
import { setKeywordsFilter } from "../../../store/actions";

const Categories = ({ type = "patterns", isSiteEditor = false }) => {
	// Store actions and states.
	const {
		setIsSidebarLoading,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setShouldResetKeywords,
		setSidebarDisplayMode,
	} = useDispatch(nfdPatternsStore);

	const setCurrentView = useSetCurrentView();

	const {
		activePatternsCategory,
		activeTemplatesCategory,
		keywordsFilter,
		currentView,
		sidebarDisplayMode,
	} = useSelect((select) => ({
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
		activeTemplatesCategory: select(nfdPatternsStore).getActiveTemplatesCategory(),
		currentView: select(nfdPatternsStore).getCurrentView(),
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
		sidebarDisplayMode: select(nfdPatternsStore).getSidebarDisplayMode(),
	}));

	// Fetch data
	const { data, error, isValidating } = useCategories(type, sidebarDisplayMode);
	const { data: allFavs } = usePatterns({ onlyFavorites: true, perPage: -1 });

	// Remove SITE_EDITOR_CATEGORIES if we are not in the Site Editor
	const filteredCategories = useMemo(() => {
		data?.forEach((category) => {
			if (
				category.label.toLowerCase() === "faq" ||
				category.label.toLowerCase() === "frequently asked questions"
			) {
				category.label = "FAQ";
			}

			if (category.label.toLowerCase() === "media embeds") {
				category.label = "Media & Embeds";
			}
		});

		if (!isSiteEditor) {
			return data?.filter((category) => !SITE_EDITOR_CATEGORIES.includes(category.title));
		}

		return data;
	}, [isSiteEditor, data]);

	const categoriesWithIcons = useMemo(() => {
		const prefix = type === "patterns" ? `patterns-${sidebarDisplayMode}` : "templates";
		return filteredCategories?.map((category) => ({
			...category,
			icon: iconMapping[`${prefix}-${category.title}`] || null,
		}));
	}, [filteredCategories]);

	// Format categories for mobile dropdown
	// prettier-ignore
	const formattedCategoriesForMobile = useMemo(() => {
		return categoriesWithIcons?.reduce((result, category) => {            
            // Handle undefined values
            const label = category.label || '';
            const count = category.count ?? '';
            const title = category.title || '';
            
            let formattedLabel = label;
            
            if (count) {
                formattedLabel += ` (${count})`; // Include parentheses only when count is defined
            }

            return [
                ...result,
                { label: formattedLabel, value: title },
            ];
        },
        [{
            value: 'favorites',
            label: `${__('Favorites', 'nfd-wonder-blocks')} (${
                allFavs?.length ?? 0
            })`,
        }]
        ).sort((a, b) => {
            if (a.value === 'favorites') {
                return 1; // Move 'favorites' to the end
            } else if (b.value === 'favorites') {
                return -1; // Keep 'favorites' at the end
            }
            
            return 0; // Maintain the original order
        });
	}, [categoriesWithIcons, allFavs?.length]);

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
			if (type === "patterns") {
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
			const categoryExists =
				"favorites" === categoryTitle ||
				data.some(function (item) {
					return item.title === categoryTitle;
				});

			if (categoryExists) {
				setActiveCategory(categoryTitle);
			} else if (data.length > 0 && data[0].title && "library" === currentView) {
				setActiveCategory(data[0].title);
			}

			setShouldResetKeywords(true);

			setCurrentView("library");
		},
		[setActiveCategory, setShouldResetKeywords, data]
	);

	/**
	 * Get active category.
	 *
	 * @return {string} Active category.
	 */
	const getActiveCategory = useCallback(() => {
		let activeCategory = "";

		if (type === "patterns") {
			activeCategory = activePatternsCategory;
		} else {
			activeCategory = activeTemplatesCategory;
		}

		const categoryExists =
			"favorites" === activeCategory ||
			data.some(function (item) {
				return item.title === activeCategory;
			});

		if (!categoryExists && data.length > 0 && data[0].title && "library" === currentView) {
			activeCategory = data[0].title;
			setActiveCategory(activeCategory);
		}

		return activeCategory;
	}, [type, data, activePatternsCategory, activeTemplatesCategory, setActiveCategory]);

	return (
		<>
			{"patterns" === type && (
				<div className="nfd-wba-sidebar-display-mode">
					<ToggleGroupControl
						value={sidebarDisplayMode}
						label={__("Layout", "nfd-wonder-blocks")}
						hideLabelFromVision
						isBlock
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setSidebarDisplayMode(value)}
					>
						<ToggleGroupControlOption
							value="categories"
							label={__("Categories", "nfd-wonder-blocks")}
						/>
						<ToggleGroupControlOption value="usage_tags" label={__("Usage", "nfd-wonder-blocks")} />
					</ToggleGroupControl>
				</div>
			)}

			{!data && isValidating && <Skeleton count={12} />}
			{!data && error && <ErrorLoading />}
			{data && (
				<>
					<SelectControl
						className="nfd-wba-modal__categories-select nfd-wba-mt-8 nfd-wba-h-12 nfd-wba-font-medium sm:!nfd-wba-hidden"
						aria-label={__("Select a category", "nfd-wonder-blocks")}
						value={getActiveCategory()}
						options={formattedCategoriesForMobile}
						onChange={(categoryTitle) => handleCategoryChange(categoryTitle)}
						__nextHasNoMarginBottom
					/>

					<ul className="nfd-wba-list-elements nfd-wba-m-0 nfd-wba-list-none nfd-wba-flex-col nfd-wba-px-0 nfd-wba-py-4 nfd-wba-text-md nfd-wba-leading-5 sm:nfd-wba-flex">
						{categoriesWithIcons?.map((category) => {
							return (
								<ListElement
									key={category.id}
									category={category}
									isActive={!keywordsFilter && category?.title === getActiveCategory()}
									onClick={() => {
										handleCategoryChange(category?.title);
									}}
									icon={category.icon && <Icon fill="none" icon={category.icon} size={20} />}
								/>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
};

export default memo(Categories);
