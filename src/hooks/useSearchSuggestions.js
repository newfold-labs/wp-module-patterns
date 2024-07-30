/**
 * WordPress dependencies
 */
import { useState, useEffect } from "react";

const useSearchSuggestions = (key = "nfdWBSearchTerms", maxItems = 10) => {
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const savedSuggestions = JSON.parse(localStorage.getItem(key)) || [];
		setSuggestions(savedSuggestions);
	}, [key]);

	const addSuggestion = (term) => {
		if (term.length < 4) return;

		let updatedSuggestions = [...suggestions];
		updatedSuggestions = updatedSuggestions.filter((t) => t !== term);
		updatedSuggestions.unshift(term);
		if (updatedSuggestions.length > maxItems) {
			updatedSuggestions.pop();
		}

		setSuggestions(updatedSuggestions);
		localStorage.setItem(key, JSON.stringify(updatedSuggestions));
	};

	const removeSuggestion = (termToRemove) => {
		const updatedSuggestions = suggestions.filter((term) => term !== termToRemove);
		setSuggestions(updatedSuggestions);
		localStorage.setItem(key, JSON.stringify(updatedSuggestions));
	};

	const loadSuggestions = () => {
		const terms = JSON.parse(localStorage.getItem("nfdWBSearchTerms")) || [];
		setSuggestions(terms);
	};

	return {
		suggestions,
		setSuggestions,
		addSuggestion,
		removeSuggestion,
		loadSuggestions,
	};
};

export default useSearchSuggestions;
