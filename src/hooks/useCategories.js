/**
 * External dependencies
 */
import useSWR from "swr";

/**
 * Internal dependencies
 */
import { NFD_REST_URL } from "../constants";
import { fetcher } from "../helpers/fetcher";

const useCategories = (type = "patterns", displayMode = null) => {
	let endpoint;

	switch (type) {
		case "patterns":
			if (displayMode === "categories") {
				endpoint = "categories";
			} else {
				endpoint = "usage_tags";
			}
			break;
		case "templates":
			endpoint = "templateCategories";
			break;
		default:
			endpoint = "categories";
	}

	const { data, error, isValidating, mutate } = useSWR(
		{ url: `${NFD_REST_URL}/${endpoint}` },
		fetcher
	);

	if (!Array.isArray(data)) {
		return {
			data: null,
			isError: error,
			isValidating,
		};
	}

	return {
		data,
		isError: error,
		isValidating,
		mutate,
	};
};

export default useCategories;
