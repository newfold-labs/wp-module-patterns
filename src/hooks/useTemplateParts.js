/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { cleanForSlug } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { getUniqueTemplatePartTitle } from '../helpers/templateUtils';

const useTemplateParts = () => {
	const { saveEntityRecord } = useDispatch(coreStore);

	const { existingTemplateParts } = useSelect((select) => ({
		existingTemplateParts: select(coreStore).getEntityRecords(
			'postType',
			'wp_template_part',
			{
				status: 'publish',
				per_page: -1,
			}
		),
	}));

	/**
	 * Check if a template part exists and return it.
	 * If it doesn't exist, create it and return it.
	 *
	 * @param {string} title   The template part title.
	 * @param {string} area    The template part area.
	 * @param {string} content The template part default content.
	 * @return {Object} The template part entity.
	 */
	const getTemplatePart = async (title, area, content = '') => {
		let foundTemplatePart = existingTemplateParts?.find((templatePart) => {
			return (
				templatePart.title.rendered === title &&
				templatePart.area === area
			);
		});

		if (!foundTemplatePart) {
			const uniqueTitle = getUniqueTemplatePartTitle(
				title,
				existingTemplateParts
			);
			const cleanSlug = cleanForSlug(uniqueTitle);

			foundTemplatePart = await saveEntityRecord(
				'postType',
				'wp_template_part',
				{
					slug: cleanSlug,
					title: uniqueTitle,
					content: content || '',
					area,
				},
				{ throwOnError: true }
			);
		}

		return foundTemplatePart;
	};

	return { existingTemplateParts, getTemplatePart };
};

export default useTemplateParts;
