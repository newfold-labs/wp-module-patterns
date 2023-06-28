/**
 * WordPress dependencies
 */
import { createBlock, serialize } from '@wordpress/blocks';
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editPostStore } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { cleanForSlug } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { WONDER_BLOCKS_BLANK_TEMPLATE_SLUG } from '../constants';
import { areTemplatesIdentical } from '../helpers/templateUtils';

const usePostTemplates = () => {
	const { __unstableCreateTemplate } = useDispatch(editPostStore);

	const { templates } = useSelect((select) => ({
		templates: select(coreStore).getEntityRecords(
			'postType',
			'wp_template',
			{
				status: 'publish',
				per_page: -1,
			}
		),
	}));

	// Get the blank template.
	const getBlankTemplate = async () => {
		const blankTemplate = {
			slug: cleanForSlug(WONDER_BLOCKS_BLANK_TEMPLATE_SLUG),
			title: __('Blank Template', 'nfd-wonder-blocks'),
			content: serialize([
				createBlock('core/post-content', {
					layout: { inherit: true },
				}),
			]),
		};

		return await getTemplate(
			blankTemplate.slug,
			blankTemplate.title,
			blankTemplate.content
		);
	};

	// Check if a template exists or create a new one and return it.
	const getTemplate = async (slug, title, content) => {
		// Check if the template already exists.
		let foundTemplate = templates?.find(
			(template) => template.slug === slug
		);

		// If the template exists, check if it's identical to the one we want to create.
		if (foundTemplate) {
			const isIdentical = areTemplatesIdentical(
				foundTemplate.content.raw,
				content
			);

			if (!isIdentical) {
				// If the template is not identical, ask if we need to update or create new.
			}
		}

		// If the template doesn't exist, create it.
		if (!foundTemplate) {
			foundTemplate = await __unstableCreateTemplate({
				slug,
				title,
				content,
			});
		}

		return foundTemplate;
	};

	return { templates, getBlankTemplate, getTemplate };
};

export default usePostTemplates;
