/**
 * WordPress dependencies
 */
import { useCallback } from "@wordpress/element";

/**
 * `useReplacePlaceholders` is a custom hook that returns a memoized function
 * to replace placeholders within a given string.
 *
 * The placeholders are specified like Record<string, string>.
 *
 * @example
 * const replace = useReplacePlaceholders();
 * replace('Hello name!', { name: 'World' }); // Returns "Hello World!"
 *
 * @return {Function} - The memoized replace function.
 */
const useReplacePlaceholders = () => {
	const replace = useCallback((str = "", placeholders = {}) => {
		let result = str;

		Object.keys(placeholders).forEach((key) => {
			if (typeof placeholders[key] === "string") {
				result = result.replaceAll(key, placeholders[key]);
			}
		});

		return result;
	}, []);

	return replace;
};

export default useReplacePlaceholders;
