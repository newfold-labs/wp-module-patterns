/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { useState, useCallback, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { NFD_REST_URL } from "../constants";
import { usePatterns } from "./";
import { trackHiiveEvent } from "../helpers/analytics";
import { store as nfdPatternsStore } from "../store";

/**
 * Custom hook to manage favorites functionality
 *
 * @param {Object} item - The design item to manage favorite status for
 * @returns {Object} Favorite management functions and state
 */
export const useFavoritesManager = (item) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const { data, mutate } = usePatterns({ onlyFavorites: true });

	// Get all favorites and mutate function
	const { data: allFavs, mutate: mutateAllFavs } = usePatterns({
		onlyFavorites: true,
		perPage: -1,
	});

	const { activeTab, activeTemplatesCategory, activePatternsCategory, keywords } = useSelect(
		(select) => ({
			activeTab: select(nfdPatternsStore).getActiveTab(),
			activeTemplatesCategory: select(nfdPatternsStore).getActiveTemplatesCategory(),
			activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
			keywords: select(nfdPatternsStore).getKeywordsFilter(),
		})
	);

	/**
	 * Check if the trash icon should be shown.
	 *
	 * @return {boolean}
	 */
	const shouldShowTrash = useCallback(() => {
		return (
			(activeTab === "patterns" &&
				activePatternsCategory === "favorites" &&
				isFavorite &&
				!keywords) ||
			(activeTab === "templates" &&
				activeTemplatesCategory === "favorites" &&
				isFavorite &&
				!keywords)
		);
	}, [activePatternsCategory, activeTab, activeTemplatesCategory, isFavorite, keywords]);

	useEffect(() => {
		let isFav = false;

		if (!Array.isArray(allFavs)) {
			return;
		}

		isFav = allFavs.find((fav) => fav.id === item.id);

		setIsFavorite(!!isFav);
	}, [allFavs, item.id]);

	/**
	 * Handle adding/removing favorites
	 */
	const favoritesClickHandler = async (toggleState = true) => {
		// Do nothing if the pattern is already in the favorites list and toggleState is false.
		if (isFavorite && !toggleState) {
			return;
		}

		// Track favorite events.
		if (!isFavorite) {
			if (activeTab === "patterns") {
				trackHiiveEvent("pattern_favorited", {
					label_key: "pattern_slug",
					pattern_id: item.id,
					pattern_slug: item.slug,
				});
			} else if (activeTab === "templates") {
				trackHiiveEvent("template_favorited", {
					label_key: "template_slug",
					template_id: item.id,
					template_slug: item.slug,
				});
			}
		}

		setIsFavorite((prev) => !prev);
		const method = isFavorite ? "DELETE" : "POST";

		const updater = async () =>
			await apiFetch({
				url: `${NFD_REST_URL}/favorites`,
				method,
				data: {
					...item,
					type: activeTab,
				},
				headers: {
					"x-nfd-wonder-blocks": "nfd_wonder_blocks",
				},
			});

		const newData =
			method === "DELETE"
				? data.filter((fav) => fav.id !== item.id)
				: [...data, { ...item, type: activeTab }];

		const updatedFavs =
			method === "DELETE"
				? allFavs.filter((fav) => fav.id !== item.id)
				: [...allFavs, { ...item, type: activeTab }];

		mutate(updater, {
			optimisticData: [...newData],
			rollbackOnError: false,
			populateCache: true,
			revalidate: false,
		});

		mutateAllFavs(() => [...updatedFavs], {
			optimisticData: [...updatedFavs],
			rollbackOnError: false,
			populateCache: true,
			revalidate: false,
		});
	};

	return {
		isFavorite,
		favoritesClickHandler,
		shouldShowTrash,
	};
};

export default useFavoritesManager;
