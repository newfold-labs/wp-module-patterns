/**
 * Hook for processing blocks for preview
 */

/**
 * WordPress dependencies
 */
import { useMemo } from "@wordpress/element";
import { rawHandler } from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { useReplacePlaceholders } from "../hooks";
import { optimizePreview, replaceThemeClasses } from "../helpers";

export const useBlockProcessor = (item) => {
	const { adminEmail } = useSelect((select) => ({
		adminEmail: select("core").getEntityRecord("root", "site")?.email,
	}));

	const replace = useReplacePlaceholders();

	const rawContent = item?.content ?? "";

	// Process placeholders
	const replacePlaceholders = useMemo(
		() => ({
			"email@example.com": adminEmail,
		}),
		[adminEmail]
	);

	// Process content with placeholders
	const content = useMemo(() => {
		const replacedContent = replace(rawContent, replacePlaceholders);
		return replaceThemeClasses(replacedContent);
	}, [replace, rawContent, replacePlaceholders, replaceThemeClasses]);

	// Parse content into blocks
	const blocks = useMemo(() => rawHandler({ HTML: content }), [content]);

	// Process blocks for preview
	const previewBlocks = useMemo(() => {
		const optimizedContent = optimizePreview(rawContent);
		return rawHandler({ HTML: replaceThemeClasses(optimizedContent) });
	}, [rawContent, replaceThemeClasses]);

	return { blocks, previewBlocks };
};

export default useBlockProcessor;
