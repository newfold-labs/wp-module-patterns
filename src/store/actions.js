/**
 * Toggles the patterns modal.
 *
 * @param {boolean} isOpen Modal open state.
 * @return {Object} Action object.
 */
export function setIsModalOpen(isOpen) {
	return {
		type: "SET_MODAL_OPEN",
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
		type: "SET_CONTENT_LOADING",
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
		type: "SET_SIDEBAR_LOADING",
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
		type: "SET_ACTIVE_PATTERNS_CATEGORY",
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
		type: "SET_ACTIVE_TEMPLATES_CATEGORY",
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
		type: "SET_KEYWORDS_FILTER",
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
		type: "SET_SHOULD_RESET_KEYWORDS",
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
		type: "SET_ACTIVE_TAB",
		activeTab,
	};
}

/**
 * Set grid columns in the modal.
 *
 * @param {*} columns
 * @returns
 */
export function setModalGridColumns(columns) {
	return {
		type: "SET_GRID_COLUMNS",
		gridColumns: columns,
	};
}

/**
 * Set sort order in the modal.
 *
 * @param {string} sortOrder
 * @returns
 */
export function setSortOrder(sortOrder) {
	return {
		type: "SET_SORT_ORDER",
		sortOrder,
	};
}

/**
 * Set current view in the modal.
 *
 * @param {string} currentView
 * @returns
 */
export function setCurrentView(currentView) {
	return {
		type: "SET_CURRENT_VIEW",
		currentView,
	};
}

/**
 * Sets the plugin installing state.
 *
 * @param {boolean} isPluginInstalling True if a plugin is being installed, false otherwise.
 * @return {Object} Action object with type 'SET_IS_PLUGIN_INSTALLING' and the isPluginInstalling value.
 */
export function setIsPluginInstalling(isPluginInstalling) {
	return {
		type: "SET_IS_PLUGIN_INSTALLING",
		isPluginInstalling,
	};
}

/**
 * Sets the display mode of the sidebar.
 *
 * @param {string} displayMode The new display mode for the sidebar.
 * @return {Object} Action object with type 'SET_SIDEBAR_DISPLAY_MODE' and the displayMode value.
 */
export function setSidebarDisplayMode(displayMode) {
	return {
		type: "SET_SIDEBAR_DISPLAY_MODE",
		displayMode,
	};
}
