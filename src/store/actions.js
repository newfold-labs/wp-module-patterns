/**
 * Toggles the patterns modal.
 *
 * @param {boolean} isOpen Modal open state.
 * @return {Object} Action object.
 */
export function setIsModalOpen(isOpen) {
	return {
		type: 'SET_MODAL_OPEN',
		isOpen,
	};
}

/**
 * Sets content loading state.
 *
 * @param {boolean} isContentLoading Loading state.
 * @return {Object} Action object.
 */
export function setIsContentLoading(isContentLoading) {
	return {
		type: 'SET_CONTENT_LOADING',
		isContentLoading,
	};
}

/**
 * Sets the active patterns category.
 *
 * @param {string} activeCategory Active category.
 * @return {Object} Action object.
 */
export function setActivePatternsCategory(activeCategory) {
	return {
		type: 'SET_ACTIVE_PATTERNS_CATEGORY',
		activeCategory,
	};
}

/**
 * Sets the active templates category.
 *
 * @param {string} activeCategory Active category.
 * @return {Object} Action object.
 */
export function setActiveTemplatesCategory(activeCategory) {
	return {
		type: 'SET_ACTIVE_TEMPLATES_CATEGORY',
		activeCategory,
	};
}

/**
 * Sets keywords filter value.
 *
 * @param {string} keywordsFilter Keywords to filter by.
 * @return {Object} Action object.
 */
export function setKeywordsFilter(keywordsFilter) {
	return {
		type: 'SET_KEYWORDS_FILTER',
		keywordsFilter,
	};
}
