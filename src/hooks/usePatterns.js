/**
 * External dependencies
 */
import useSWR from 'swr';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	DEFAULT_PATTERNS_CATEGORY,
	DEFAULT_TEMPLATES_CATEGORY,
	NFD_REST_URL,
} from '../constants';
import { fetcher } from '../helpers/fetcher';
import { store as nfdPatternsStore } from '../store';

/**
 * Custom hook to fetch patterns.
 *
 * @param {boolean} onlyFavorites If true is passed, it will return only the favorites.
 * @return {Object} Object containing the patterns, error and loading state.
 */
const usePatterns = (onlyFavorites = false) => {
	const {
		activePatternsCategory,
		activeTemplatesCategory,
		activeTab,
		keywords,
	} = useSelect((select) => ({
		activePatternsCategory:
			select(nfdPatternsStore).getActivePatternsCategory(),
		activeTemplatesCategory:
			select(nfdPatternsStore).getActiveTemplatesCategory(),
		activeTab: select(nfdPatternsStore).getActiveTab(),
		keywords: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	// Active category.
	let activeCategory = null;
	if (activeTab === 'patterns') {
		activeCategory = activePatternsCategory || DEFAULT_PATTERNS_CATEGORY;
	} else {
		activeCategory = activeTemplatesCategory || DEFAULT_TEMPLATES_CATEGORY;
	}

	// Can be either "patterns" or "templates".
	const endpoint = activeTab === 'patterns' ? 'patterns' : 'templates';

	let url = null;
	let restUrl = '';

	// Check if NFD_REST_URL starts with http or https.
	if (typeof NFD_REST_URL === 'string' && NFD_REST_URL.startsWith('http')) {
		restUrl = NFD_REST_URL;
	} else {
		// if not, assume it's a relative path.
		restUrl = window.location.origin + NFD_REST_URL;
	}

	if (onlyFavorites || (activeCategory === 'favorites' && !keywords)) {
		url = new URL(`${restUrl}/favorites`);
	} else {
		url = new URL(`${restUrl}/${endpoint}`);

		if (keywords) {
			url.searchParams.append('keywords', keywords);
		} else {
			url.searchParams.append('category', activeCategory);
		}
	}

	const { data, error, isValidating, mutate } = useSWR(
		{ url: url?.href },
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			shouldRetryOnError: false,
		}
	);

	return useMemo(() => {
		let dataWithType = null;

		if (data && Array.isArray(data)) {
			dataWithType = data?.map((pattern) => {
				return { ...pattern, type: endpoint };
			});
		}

		return {
			data: activeCategory !== 'favorites' ? dataWithType : data,
			isError: error,
			isValidating,
			isFavorites:
				activeCategory !== 'favorites' || keywords ? false : true,
			mutate,
		};
	}, [data, activeCategory, error, isValidating, endpoint, keywords, mutate]);
};

export default usePatterns;
