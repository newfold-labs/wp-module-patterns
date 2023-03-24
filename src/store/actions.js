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
 * Sets sidebar loading state.
 *
 * @param {boolean} isSidebarLoading Loading state.
 * @return {Object} Action object.
 */
export function setIsSidebarLoading(isSidebarLoading) {
	return {
		type: 'SET_SIDEBAR_LOADING',
		isSidebarLoading,
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

/**
 * Sets if keywords filter should be reset.
 *
 * @param {boolean} shouldResetKeywords Should reset keywords filter.
 * @return {Object} Action object.
 */
export function setShouldResetKeywords(shouldResetKeywords) {
	return {
		type: 'SET_SHOULD_RESET_KEYWORDS',
		shouldResetKeywords,
	};
}

/**
 * Set active tab in sidebar modal.
 *
 * @param {string} activeTab Active tab.
 * @return {Object} Action object.
 */
export function setActiveTab(activeTab) {
	return {
		type: 'SET_ACTIVE_TAB',
		activeTab,
	};
}
