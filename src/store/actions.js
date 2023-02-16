/**
 * Toggles the patterns modal.
 *
 * @param {boolean} isOpen
 * @return {Object} Action object.
 */
export function setIsModalOpen(isOpen) {
	return {
		type: 'SET_MODAL_OPEN',
		isOpen,
	};
}

/**
 * Sets the active pattern category.
 *
 * @param {string} activeCategory
 * @return {Object} Action object.
 * @example setActivePatternCategory('favorites')
 */
export function setActivePatternCategory(activeCategory) {
	return {
		type: 'SET_ACTIVE_PATTERN_CATEGORY',
		activeCategory,
	};
}
