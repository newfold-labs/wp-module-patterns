/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

export function modal(
	state = {
		isOpen: false,
		isContentLoading: false,
		keywordsFilter: '',
	},
	action
) {
	switch (action.type) {
		case 'SET_MODAL_OPEN':
			return {
				...state,
				isOpen: action.isOpen,
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
	}

	return state;
}

export function patterns(
	state = {
		activeCategory: null,
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
		activeCategory: null,
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
