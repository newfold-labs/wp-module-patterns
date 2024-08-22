/**
 * External dependencies
 */
import useSWR from "swr";

/**
 * Internal dependencies
 */
import { NFD_REST_URL } from "../constants";
import { fetcher } from "../helpers/fetcher";

const useCategories = (type = "patterns") => {
	const endpoint = type === "patterns" ? "categories" : "templateCategories";

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
