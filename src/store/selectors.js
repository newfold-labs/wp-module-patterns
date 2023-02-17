/**
 * Checks if the patterns modal is open.
 *
 * @param {*} state
 * @return {boolean} True if the modal is open, false otherwise.
 */
export function isModalOpen(state) {
	return state.modal.isOpen;
}

/**
 * Gets the active pattern category.
 *
 * @param {*} state
 * @return {string} The active pattern category.
 */
export function getActivePatternCategory(state) {
	return state.patterns.activeCategory;
}

/**
 * Gets keywords filter value.
 *
 * @param {*} state
 * @return {string} The keywords filter value.
 */
export function getKeywordsFilter(state) {
	return state.patterns.keywordsFilter;
}
