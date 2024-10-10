/**
 * WordPress dependencies
 */
import { combineReducers } from "@wordpress/data";

/**
 * Internal dependencies
 */
import {
	DEFAULT_ACTIVE_TAB,
	DEFAULT_PATTERNS_CATEGORY,
	DEFAULT_SORT_ORDER,
	DEFAULT_TEMPLATES_CATEGORY,
	DEFAULT_VIEW,
	DEFAULT_GRID_COLUMNS,
	DEFAULT_SIDEBAR_DISPLAY_MODE,
} from "../constants";

function getInitialGridColumns() {
	const savedColumns = localStorage.getItem("nfdWBGridColumns");
	return savedColumns ? Number(savedColumns) : DEFAULT_GRID_COLUMNS;
}

function getInitialSortOrder() {
	const savedSortOrder = localStorage.getItem("nfdWBSortOrder");
	return savedSortOrder ? savedSortOrder : DEFAULT_SORT_ORDER;
}

export function modal(
	state = {
		isOpen: false,
		isContentLoading: false,
		keywordsFilter: "",
		activeTab: DEFAULT_ACTIVE_TAB,
		gridColumns: getInitialGridColumns(),
		sortOrder: getInitialSortOrder(),
		currentView: DEFAULT_VIEW,
		isPluginInstalling: false,
		sidebarDisplayMode: DEFAULT_SIDEBAR_DISPLAY_MODE,
	},
	action
) {
	switch (action.type) {
		case "SET_MODAL_OPEN":
			return {
				...state,
				isOpen: action.isOpen,
			};

		case "SET_SIDEBAR_LOADING":
			return {
				...state,
				isSidebarLoading: action.isSidebarLoading,
			};

		case "SET_CONTENT_LOADING":
			return {
				...state,
				isContentLoading: action.isContentLoading,
			};

		case "SET_KEYWORDS_FILTER":
			return {
				...state,
				keywordsFilter: action.keywordsFilter,
			};

		case "SET_SHOULD_RESET_KEYWORDS":
			return {
				...state,
				shouldResetKeywords: !!action.shouldResetKeywords,
			};

		case "SET_ACTIVE_TAB":
			return {
				...state,
				activeTab: action.activeTab,
			};
		case "SET_GRID_COLUMNS":
			localStorage.setItem("nfdWBGridColumns", action.gridColumns);
			return {
				...state,
				gridColumns: action.gridColumns,
			};
		case "SET_SORT_ORDER":
			localStorage.setItem("nfdWBSortOrder", action.sortOrder);
			return {
				...state,
				sortOrder: action.sortOrder,
			};
		case "SET_CURRENT_VIEW":
			return {
				...state,
				currentView: action.currentView,
			};
		case "SET_IS_PLUGIN_INSTALLING":
			return {
				...state,
				isPluginInstalling: action.isPluginInstalling,
			};
		case "SET_SIDEBAR_DISPLAY_MODE":
			return {
				...state,
				sidebarDisplayMode: action.displayMode,
			};
	}

	return state;
}

export function patterns(
	state = {
		activeCategory: DEFAULT_PATTERNS_CATEGORY,
	},
	action
) {
	switch (action.type) {
		case "SET_ACTIVE_PATTERNS_CATEGORY":
			return {
				...state,
				activeCategory: action.activeCategory,
			};
	}

	return state;
}

export function templates(
	state = {
		activeCategory: DEFAULT_TEMPLATES_CATEGORY,
	},
	action
) {
	switch (action.type) {
		case "SET_ACTIVE_TEMPLATES_CATEGORY":
			return {
				...state,
				activeCategory: action.activeCategory,
			};
	}

	return state;
}

export default combineReducers({
	modal,
	patterns,
	templates,
});
