/**
 * WordPress dependencies
 */
import { SearchControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import debounce from 'lodash/debounce';

/**
 * Internal dependencies
 */
import { INPUT_DEBOUNCE_TIME } from '../../../../constants';
import { store as nfdPatternsStore } from '../../../../store';

const KeywordFilter = () => {
	const searchRef = useRef('');
	const [searchValue, setSearchValue] = useState('');

	const { setKeywordsFilter } = useDispatch(nfdPatternsStore);
	const { isSidebarLoading, isContentLoading } = useSelect((select) => ({
		isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
		isContentLoading: select(nfdPatternsStore).isContentLoading(),
	}));

	// Focus the search input on mount.
	useEffect(() => {
		searchRef.current.focus();
	}, []);

	// Debounce search value changes in store.
	useEffect(() => {
		const delayedSearch = debounce(
			() => {
				setKeywordsFilter(searchValue);
			},
			searchValue === '' ? 0 : INPUT_DEBOUNCE_TIME // Don't debounce empty searches.
		);

		delayedSearch();

		return delayedSearch.cancel;
	}, [searchValue, setKeywordsFilter]);

	return (
		<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-3">
			<SearchControl
				className="nfd-wba-keyword-filter nfd-wba-m-0"
				disabled={isSidebarLoading || isContentLoading}
				placeholder={__('Keywords', 'nfd-wonder-blocks')}
				ref={searchRef}
				value={searchValue}
				onChange={(value) => {
					setSearchValue(value);
				}}
			/>
		</div>
	);
};
export default KeywordFilter;
