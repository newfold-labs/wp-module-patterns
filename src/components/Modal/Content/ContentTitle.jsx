/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useCategories from '../../../hooks/useCategories';

const ContentTitle = ({ activeTab, currentCategory, title }) => {
	// Fetch data.
	const { data, error } = useCategories(activeTab);

	const activeCategory = useMemo(
		() => data?.find((cat) => cat.title === currentCategory),
		[data, currentCategory]
	);

	if (error || !data) {
		return null;
	}

	if (!activeCategory?.label && !title && currentCategory !== 'favorites') {
		return null;
	}

	return (
		<h1 className="nfd-wba-my-0 nfd-wba-mb-8 nfd-wba-text-[26px] nfd-wba-font-light nfd-wba-text-dark">
			{!title &&
				currentCategory === 'favorites' &&
				__('Favorites', 'nfd-wonder-blocks')}

			{title &&
				sprintf(
					// translators: %s: search keywords.
					__('Results for %s', 'nfd-wonder-blocks'),
					title
				)}
			{!title && activeCategory?.label}
		</h1>
	);
};
export default ContentTitle;
