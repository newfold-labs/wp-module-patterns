/**
 * WordPress dependencies
 */
import { Button, SearchControl } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useRef, useState, useTransition } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { closeSmall, Icon, search } from "@wordpress/icons";

/**
 * External dependencies
 */
import classNames from "classnames";
import debounce from "lodash/debounce";

/**
 * Internal dependencies
 */
import { INPUT_DEBOUNCE_TIME } from "../../../constants";
import useSearchSuggestions from "../../../hooks/useSearchSuggestions";
import useSetCurrentView from "../../../hooks/useSetCurrentView";
import { store as nfdPatternsStore } from "../../../store";

const KeywordFilter = () => {
	const [searchValue, setSearchValue] = useState("");
	const [hasFocus, setHasFocus] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isInteracting, setIsInteracting] = useState(false);
	const searchRef = useRef(null);
	const dropdownRef = useRef(null); // Ref for the dropdown
	const setCurrentView = useSetCurrentView();
	const { suggestions, loadSuggestions, addSuggestion, removeSuggestion } = useSearchSuggestions();

	const { setKeywordsFilter, setShouldResetKeywords } = useDispatch(nfdPatternsStore);

	const { isSidebarLoading, shouldResetKeywords } = useSelect((select) => ({
		isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
		shouldResetKeywords: select(nfdPatternsStore).shouldResetKeywords(),
	}));

	// Debounce search value changes in store.
	useEffect(() => {
		const delayedSearch = debounce(
			() => {
				startTransition(() => {
					setKeywordsFilter(searchValue.trim());
					setCurrentView("library");

					if (searchValue.trim().length >= 5) {
						addSuggestion(searchValue.trim());
					}
				});
			},
			searchValue.trim() === "" ? 0 : INPUT_DEBOUNCE_TIME // Don't debounce empty searches.
		);

		if (typeof searchValue === "string" && searchValue.trim().length >= 2) {
			delayedSearch();
		} else {
			startTransition(() => {
				setKeywordsFilter(""); // Clear the filter if the searchValue has less than 3 chars
			});
		}

		return delayedSearch.cancel;
	}, [searchValue, setKeywordsFilter]);

	useEffect(() => {
		if (shouldResetKeywords) {
			setSearchValue("");
			setShouldResetKeywords(false);
		}
	}, [setShouldResetKeywords, shouldResetKeywords]);

	// Handle clicks outside the component
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setHasFocus(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle the display of suggestions
	useEffect(() => {
		const delayedSuggestions = debounce(() => {
			startTransition(() => {
				setShowSuggestions(true);
			});
		});

		if (hasFocus && suggestions.length > 0) {
			delayedSuggestions();
		} else {
			startTransition(() => {
				setShowSuggestions(false);
			});
		}

		return delayedSuggestions.cancel;
	}, [hasFocus, suggestions]);

	return (
		<div className="nfd-wba-relative nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-3">
			{!hasFocus && (
				<Button
					label={__("Search", "nfd-wonder-blocks")}
					aria-label={__("Search", "nfd-wonder-blocks")}
					aria-haspopup="true"
					aria-expanded={hasFocus}
					aria-controls="nfd-wba-filter-patterns"
					aria-busy={isPending}
					className="nfd-wba-search-toggle sm:nfd-wba-hidden"
					type="button"
					showTooltip={true}
					onClick={() => {
						setHasFocus(true);
						setTimeout(() => {
							searchRef.current?.focus();
						}, 50);
					}}
				>
					<Icon icon={search} iconSize={24} />
				</Button>
			)}

			<SearchControl
				id="nfd-wba-filter-patterns"
				ref={searchRef}
				className={classNames(
					"nfd-wba-keyword-filter nfd-wba-m-0",
					!hasFocus && "nfd-wba-invisible sm:nfd-wba-visible"
				)}
				disabled={isSidebarLoading}
				label={__("Search", "nfd-wonder-blocks")}
				hideLabelFromVision={true}
				placeholder={__("Search", "nfd-wonder-blocks")}
				value={searchValue}
				onFocus={() => {
					setHasFocus(true);
					setIsInteracting(false);
					loadSuggestions();
				}}
				onBlur={() => {
					if (!isInteracting) {
						setTimeout(() => {
							setHasFocus(false);
						}, 100);
					}
				}}
				onChange={(value) => {
					setSearchValue(value);
				}}
			/>
			{showSuggestions && (
				<ul
					ref={dropdownRef}
					className="nfd-wba-absolute nfd-wba-bg-white nfd-wba-shadow-lg nfd-wba-w-full nfd-wba-max-h-40 nfd-wba-overflow-y-auto nfd-wba-z-10 nfd-wba-mt-9 nfd-wba-top-0 nfd-wba-mb-0"
				>
					{suggestions.map((term, index) => {
						if (
							searchValue &&
							(!term.toLowerCase().includes(searchValue.toLowerCase()) ||
								term.toLowerCase() === searchValue.toLowerCase())
						) {
							return null;
						}

						return (
							<li
								key={index}
								className="nfd-wba-flex nfd-wba-justify-between nfd-wba-items-center nfd-wba-pl-3 nfd-wba-py-1.5 nfd-wba-pr-1
								nfd-wba-mb-0 nfd-wba-cursor-pointer hover:nfd-wba-bg-gray-100 nfd-wba-text-gray-500 last:nfd-wba-mb-1.5 first:nfd-wba-mt-1.5"
							>
								<span onMouseDown={() => setSearchValue(term)} className="nfd-wba-flex-grow">
									{term}
								</span>
								<button
									type="button"
									className="nfd-wba-bg-transparent nfd-wba-border-none nfd-wba-cursor-pointer nfd-wba-flex nfd-wba-items-center"
									onMouseDown={(e) => {
										e.stopPropagation(); // Prevent triggering the parent onMouseDown
										setIsInteracting(true); // Prevent closing on blur
										removeSuggestion(term);
									}}
									onMouseUp={() => setIsInteracting(false)} // Reset interaction flag
								>
									<Icon icon={closeSmall} size={16} className="nfd-wba-fill-gray-500" />
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default KeywordFilter;
