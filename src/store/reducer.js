/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

export function modal(state = { isOpen: false }, action) {
	switch (action.type) {
		case 'SET_MODAL_OPEN':
			return {
				...state,
				isOpen: action.isOpen,
			};
	}

	return state;
}

export function patterns(
	state = {
		activeCategory: null,
		keywordsFilter: '',
	},
	action
) {
	switch (action.type) {
		case 'SET_ACTIVE_PATTERN_CATEGORY':
			return {
				...state,
				activeCategory: action.activeCategory,
			};

		case 'SET_KEYWORDS_FILTER':
			return {
				...state,
				keywordsFilter: action.keywordsFilter,
			};
	}

	return state;
}

export default combineReducers({
	modal,
	patterns,
});
