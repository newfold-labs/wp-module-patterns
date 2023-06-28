import { createBlock, serialize } from '@wordpress/blocks';

/**
 * Compare two templates to see if they are identical.
 *
 * @param {string} template1 Template 1 content.
 * @param {string} template2 Template 2 content.
 * @return {boolean}          Whether the templates are identical.
 */
export const areTemplatesIdentical = (template1, template2) => {
	// Serialize the templates to JSON
	const template1Json = JSON.stringify(wp.blocks.parse(template1));
	const template2Json = JSON.stringify(wp.blocks.parse(template2));

	// Compare the JSON strings
	return template1Json === template2Json;
};

/**
 * Return a unique template part title based on
 * the given title and existing template parts.
 *
 * @param {string} title         The original template part title.
 * @param {Object} templateParts The array of template part entities.
 * @return {string} A unique template part title.
 */
export const getUniqueTemplatePartTitle = (title, templateParts) => {
	const lowercaseTitle = title.toLowerCase();
	const existingTitles = templateParts.map((templatePart) =>
		templatePart.title.rendered.toLowerCase()
	);

	if (!existingTitles.includes(lowercaseTitle)) {
		return title;
	}

	let suffix = 2;
	while (existingTitles.includes(`${lowercaseTitle} ${suffix}`)) {
		suffix++;
	}

	return `${title} ${suffix}`;
};
