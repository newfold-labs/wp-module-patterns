/**
 * WordPress dependencies
 */
import { useDispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from "../store";

const useSetCurrentView = () => {
	// Store actions and states.
	const {
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setShouldResetKeywords,
		setCurrentView,
	} = useDispatch(nfdPatternsStore);

	const currentView = (view) => {
		if (typeof view !== "string") {
			return;
		}

		if (view === "library" || view === "favorites") {
			setCurrentView("library");
		} else if (view === "info") {
			setCurrentView("info");
			setActivePatternsCategory("");
			setActiveTemplatesCategory("");
			setShouldResetKeywords(true);
		} else if (view === "about") {
			setCurrentView("about");
			setActivePatternsCategory("");
			setActiveTemplatesCategory("");
			setShouldResetKeywords(true);
		}
	};
	return currentView;
};

export default useSetCurrentView;
