/**
 * External dependencies
 */
import useSWRInfinite from "swr/infinite";

/**
 * WordPress dependencies
 */
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { DEFAULT_PATTERNS_CATEGORY, DEFAULT_TEMPLATES_CATEGORY, NFD_REST_URL } from "../constants";
import { fetcher } from "../helpers/fetcher";
import { store as nfdPatternsStore } from "../store";

/**
 * Custom hook to fetch patterns.
 *
 * @param {Object}  params               - Object containing the parameters.
 * @param {boolean} params.onlyFavorites - Whether to fetch only favorites.
 * @param {number}  params.perPage       - Number of items per page.
 * @return {Object} Object containing the patterns, error and loading state.
 */
const usePatterns = ({ onlyFavorites = false, perPage = 4 } = {}) => {
	const {
		activePatternsCategory,
		activeTemplatesCategory,
		activeTab,
		keywords,
		sortOrder,
		sidebarDisplayMode,
	} = useSelect((select) => ({
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
		activeTemplatesCategory: select(nfdPatternsStore).getActiveTemplatesCategory(),
		activeTab: select(nfdPatternsStore).getActiveTab(),
		keywords: select(nfdPatternsStore).getKeywordsFilter(),
		sortOrder: select(nfdPatternsStore).getSortOrder(),
		sidebarDisplayMode: select(nfdPatternsStore).getSidebarDisplayMode(),
	}));

	// Active category.
	let activeCategory = null;

	if (activeTab === "patterns") {
		activeCategory = activePatternsCategory || DEFAULT_PATTERNS_CATEGORY;
	} else {
		activeCategory = activeTemplatesCategory || DEFAULT_TEMPLATES_CATEGORY;
	}

	// Can be either "patterns" or "templates".
	const endpoint = activeTab === "patterns" ? "patterns" : "templates";

	let url = null;
	let restUrl = "";

	// Check if NFD_REST_URL starts with http or https.
	if (typeof NFD_REST_URL === "string" && NFD_REST_URL.startsWith("http")) {
		restUrl = NFD_REST_URL;
	} else {
		// if not, assume it's a relative path.
		restUrl = window.location.origin + NFD_REST_URL;
	}

	if (onlyFavorites || (activeCategory === "favorites" && !keywords)) {
		url = new URL(`${restUrl}/favorites`);
	} else {
		url = new URL(`${restUrl}/${endpoint}`);

		if (keywords) {
			url.searchParams.append("keywords", keywords);
		} else if ("usage_tags" === sidebarDisplayMode) {
			url.searchParams.append("keywords", activeCategory);
			url.searchParams.append("matchType", "exact");
		} else {
			url.searchParams.append("category", activeCategory);
		}

		url.searchParams.append("sort_by", sortOrder);
	}

	const getKey = (pageIndex, previousPageData) => {
		if (previousPageData && !previousPageData.length) {
			return null;
		}

		if (perPage > 0) {
			url.searchParams.set("page", pageIndex + 1);
			url.searchParams.set("per_page", perPage);
		}

		return { url: url.href };
	};

	const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
		errorRetryCount: 3,
		dedupingInterval: 5000,
	});

	return useMemo(() => {
		let dataWithType = null;

		const items = data ? [].concat(...data) : [];

		if (items && Array.isArray(items)) {
			dataWithType = items?.map((pattern) => {
				return { ...pattern, type: endpoint };
			});
		}

		return {
			data: activeCategory !== "favorites" ? dataWithType : items,
			hasMore: data && data[data.length - 1]?.length === perPage,
			isError: error,
			isValidating,
			isFavorites: activeCategory !== "favorites" || keywords ? false : true,
			mutate,
			size,
			setSize,
		};
	}, [
		data,
		activeCategory,
		perPage,
		error,
		isValidating,
		keywords,
		mutate,
		size,
		setSize,
		endpoint,
	]);
};

export default usePatterns;
