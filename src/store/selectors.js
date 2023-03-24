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
 * Checks if sidebar is loading.
 *
 * @param {*} state
 * @return {boolean} True if the sidebar/categories is loading, false otherwise.
 */
export function isSidebarLoading(state) {
	return state.modal.isSidebarLoading;
}

/**
 * Checks if content is loading.
 *
 * @param {*} state
 * @return {boolean} True if the content is loading, false otherwise.
 */
export function isContentLoading(state) {
	return state.modal.isContentLoading;
}

/**
 * Gets keywords filter value.
 *
 * @param {*} state
 * @return {string} The keywords filter value.
 */
export function getKeywordsFilter(state) {
	return state.modal.keywordsFilter;
}

/**
 * Gets if keywords should be reset.
 *
 * @param {*} state
 * @return {boolean} Should reset keywords.
 */
export function shouldResetKeywords(state) {
	return state.modal.shouldResetKeywords;
}

/**
 * Get active tab in sidebar.
 *
 * @param {*} state
 * @return {string} The active tab.
 */
export function getActiveTab(state) {
	return state.modal.activeTab;
}

/**
 * Gets the active patterns category.
 *
 * @param {*} state
 * @return {string} The active pattern category.
 */
export function getActivePatternsCategory(state) {
	return state.patterns.activeCategory;
}

/**
 * Gets the active templates category.
 *
 * @param {*} state
 * @return {string} The active templates category.
 */
export function getActiveTemplatesCategory(state) {
	return state.templates.activeCategory;
}
