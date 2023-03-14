/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	DEFAULT_PATTERNS_CATEGORY,
	DEFAULT_TEMPLATES_CATEGORY,
	REST_URL,
} from '../constants';
import { fetcher } from '../helpers/fetcher';
import { store as nfdPatternsStore } from '../store';

/**
 * External dependencies
 */
import useSWR from 'swr';

const usePatterns = () => {
	const { activePatternsCategory, activeTemplatesCategory, activeTab } =
		useSelect((select) => ({
			activePatternsCategory:
				select(nfdPatternsStore).getActivePatternsCategory(),
			activeTemplatesCategory:
				select(nfdPatternsStore).getActiveTemplatesCategory(),
			activeTab: select(nfdPatternsStore).getActiveTab(),
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

	// Build request URL.
	const url = new URL(`${REST_URL}/${endpoint}`);
	url.searchParams.append('category', activeCategory);

	const { data, error, isValidating } = useSWR({ url: url.href }, fetcher);

	const dataWithType = data?.map((pattern) => {
		return { ...pattern, type: endpoint };
	});

	if (activeCategory === 'favorites') {
		return {
			data: null,
			isError: null,
			isValidating: null,
			isFavorites: true,
		};
	}

	return {
		data: dataWithType,
		isError: error,
		isValidating,
		isFavorites: false,
	};
};

export default usePatterns;
