/**
 * WordPress dependencies
 */
import { createBlock, serialize } from "@wordpress/blocks";
import { store as coreStore } from "@wordpress/core-data";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editPostStore } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { cleanForSlug } from "@wordpress/url";

/**
 * Internal dependencies
 */
import { WONDER_BLOCKS_BLANK_TEMPLATE_SLUG } from "../constants";

const usePostTemplates = () => {
	const { __unstableCreateTemplate } = useDispatch(editPostStore);

	const { templates } = useSelect((select) => ({
		templates: select(coreStore).getEntityRecords("postType", "wp_template", {
			status: "publish",
			per_page: -1,
		}),
	}));

	const getBlankTemplate = async () => {
		const slug = cleanForSlug(WONDER_BLOCKS_BLANK_TEMPLATE_SLUG);

		// Check if the template already exists.
		let foundTemplate = templates?.find((template) => template.slug === slug);

		// If the template doesn't exist, create it.
		if (!foundTemplate) {
			foundTemplate = await __unstableCreateTemplate({
				slug,
				title: __("Blank Template", "nfd-wonder-blocks"),
				content: serialize([
					createBlock("core/post-content", {
						layout: { inherit: true },
					}),
				]),
			});
		}

		return foundTemplate;
	};

	return { templates, getBlankTemplate };
};

export default usePostTemplates;
