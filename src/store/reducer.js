/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	DEFAULT_ACTIVE_TAB,
	DEFAULT_PATTERNS_CATEGORY,
	DEFAULT_TEMPLATES_CATEGORY,
} from '../constants';

export function modal(
	state = {
		isOpen: false,
		isContentLoading: false,
		keywordsFilter: '',
		activeTab: DEFAULT_ACTIVE_TAB,
	},
	action
) {
	switch (action.type) {
		case 'SET_MODAL_OPEN':
			return {
				...state,
				isOpen: action.isOpen,
			};

		case 'SET_SIDEBAR_LOADING':
			return {
				...state,
				isSidebarLoading: action.isSidebarLoading,
			};

		case 'SET_CONTENT_LOADING':
			return {
				...state,
				isContentLoading: action.isContentLoading,
			};

		case 'SET_KEYWORDS_FILTER':
			return {
				...state,
				keywordsFilter: action.keywordsFilter,
			};

		case 'SET_SHOULD_RESET_KEYWORDS':
			return {
				...state,
				shouldResetKeywords: !!action.shouldResetKeywords,
			};

		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.activeTab,
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
		case 'SET_ACTIVE_PATTERNS_CATEGORY':
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
		case 'SET_ACTIVE_TEMPLATES_CATEGORY':
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
